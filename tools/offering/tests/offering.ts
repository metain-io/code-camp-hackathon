import { expect } from "chai";

import * as web3 from "@solana/web3.js";
import * as token from "@solana/spl-token";

import * as anchor from "@project-serum/anchor";
import { Program, Spl } from "@project-serum/anchor";
import { Offering } from "../target/types/offering";

const NFT_TOTAL_SUPPLY = 200000;

let pda;

export async function createNewMint(connection: web3.Connection, payer: web3.Keypair, mintAuthority: web3.PublicKey, freezeAuthority: web3.PublicKey, decimals: number): Promise<web3.PublicKey> {
  const tokenMint = await token.createMint(connection, payer, mintAuthority, freezeAuthority, decimals);

  console.log(`Token Mint: https://explorer.solana.com/address/${tokenMint}?cluster=devnet`);

  return tokenMint;
}

export async function mintTokens(connection: web3.Connection, payer: web3.Keypair, mint: web3.PublicKey, destination: web3.PublicKey, authority: web3.Keypair, amount: number | bigint) {
  const transactionSignature = await token.mintTo(connection, payer, mint, destination, authority, amount);

  console.log(`Mint Token Transaction: https://explorer.solana.com/tx/${transactionSignature}?cluster=devnet`);
}

export async function createTokenAccount(connection: web3.Connection, payer: web3.Keypair, mint: web3.PublicKey, owner: web3.PublicKey) {
  const tokenAccount = await token.getOrCreateAssociatedTokenAccount(connection, payer, mint, owner);

  console.log(`Token Account: https://explorer.solana.com/address/${tokenAccount.address}?cluster=devnet`);

  return tokenAccount;
}

export async function fundSolana(provider: anchor.AnchorProvider, account: web3.PublicKey, amount: number) {
  let txFund = new anchor.web3.Transaction();
  txFund.add(
    anchor.web3.SystemProgram.transfer({
      fromPubkey: provider.wallet.publicKey,
      toPubkey: account,
      lamports: amount * anchor.web3.LAMPORTS_PER_SOL
    })
  );
  await provider.sendAndConfirm(txFund);
}

describe("offering", () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env();
  const connection = provider.connection;
  anchor.setProvider(provider);

  const program = anchor.workspace.Offering as Program<Offering>;

  const payer: web3.Keypair = (provider.wallet as any).payer;
  const admin = anchor.web3.Keypair.generate();
  const treasurer = anchor.web3.Keypair.generate();
  const buyer = anchor.web3.Keypair.generate();

  let mintUSDT;
  let mintVOT1;

  const getPdaParams = async (connection: anchor.web3.Connection, signer: anchor.web3.PublicKey, mintNFT: anchor.web3.PublicKey): Promise<any> => {
    const uid = new anchor.BN(parseInt((Date.now() / 1000).toString()));
    const uidBuffer = uid.toBuffer("le", 8);

    let [statePubKey, stateBump] = await anchor.web3.PublicKey.findProgramAddress([Buffer.from("state"), signer.toBuffer(), mintNFT.toBuffer(), uidBuffer], program.programId);
    let [walletPubKey, walletBump] = await anchor.web3.PublicKey.findProgramAddress(
      [Buffer.from("wallet"), signer.toBuffer(), mintNFT.toBuffer(), uidBuffer], program.programId,
    );
    return {
      stateBump,

      idx: uid,
      stateKey: statePubKey,
      escrowBump: walletBump,
      escrowWalletKey: walletPubKey
    };
  };

  it("Initialize", async () => {
    // Fund accounts with gas
    await Promise.all([fundSolana(provider, admin.publicKey, 5), fundSolana(provider, buyer.publicKey, 5), fundSolana(provider, treasurer.publicKey, 5)]);

    // create mint for USDT and VOT1 NFT
    [mintUSDT, mintVOT1] = await Promise.all([createNewMint(connection, admin, admin.publicKey, admin.publicKey, 6), createNewMint(connection, admin, admin.publicKey, admin.publicKey, 0)]);

    const [treasurerTokenAccount, buyerTokenAccount] = await Promise.all([
      createTokenAccount(connection, treasurer, mintVOT1, treasurer.publicKey),
      createTokenAccount(connection, buyer, mintUSDT, buyer.publicKey)
    ]);

    await Promise.all([
      // Mint 200k VOT1 NFT to treasurer
      mintTokens(connection, treasurer, mintVOT1, treasurerTokenAccount.address, admin, NFT_TOTAL_SUPPLY),
      // Mint 1000 USDT to buyer
      mintTokens(connection, buyer, mintUSDT, buyerTokenAccount.address, admin, 1000 * 1000000)
    ]);

    pda = await getPdaParams(connection, treasurer.publicKey, mintVOT1);

    expect(mintUSDT.toBase58());
  });

  it("Prepare NFT vault", async () => {
    const [walletToTakeNft] = await Promise.all([
      createTokenAccount(connection, treasurer, mintVOT1, treasurer.publicKey)
    ]);

    await program.methods
      .depositNft(new anchor.BN(pda.idx), pda.stateBump, new anchor.BN(NFT_TOTAL_SUPPLY))
      .accounts({
        treasurer: walletToTakeNft.owner,
        mintOfTokenBeingSent: mintVOT1,
        mintOfTokenBeingPaid: mintUSDT,
        walletToWithdrawFrom: walletToTakeNft.address,
        escrowWalletState: pda.escrowWalletKey,
        applicationState: pda.stateKey,
        systemProgram: anchor.web3.SystemProgram.programId,
        tokenProgram: token.TOKEN_PROGRAM_ID,
        rent: anchor.web3.SYSVAR_RENT_PUBKEY
      })
      .signers([treasurer])
      .rpc();
  });

  it("Buy NFT", async () => {
    const [walletToWithdrawFrom, walletToDepositTo, walletToSendTo] = await Promise.all([
      createTokenAccount(connection, buyer, mintUSDT, buyer.publicKey),
      createTokenAccount(connection, treasurer, mintUSDT, treasurer.publicKey),
      createTokenAccount(connection, buyer, mintVOT1, buyer.publicKey)
    ]);

    await program.methods
      .buy(new anchor.BN(pda.idx), pda.stateBump, pda.escrowBump, new anchor.BN(10))
      .accounts({
        treasurer: treasurer.publicKey,
        mintOfTokenBeingPaid: mintUSDT,
        mintOfTokenBeingSent: mintVOT1,
        buyer: walletToWithdrawFrom.owner,
        walletToWithdrawFrom: walletToWithdrawFrom.address,
        walletToDepositTo: walletToDepositTo.address,
        walletToSendTo: walletToSendTo.address,
        escrowWalletState: pda.escrowWalletKey,
        applicationState: pda.stateKey,
        systemProgram: anchor.web3.SystemProgram.programId,
        tokenProgram: token.TOKEN_PROGRAM_ID,
        associatedTokenProgram: token.ASSOCIATED_TOKEN_PROGRAM_ID,
        rent: anchor.web3.SYSVAR_RENT_PUBKEY
      })
      .signers([buyer])
      .rpc();

    const balance = await connection.getTokenAccountBalance(walletToDepositTo.address);
    console.log(balance.value.amount);

    const balance2 = await connection.getTokenAccountBalance(walletToSendTo.address);
    console.log(balance2);
  });
});
