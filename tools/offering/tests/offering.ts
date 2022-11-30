import { expect } from "chai";

import * as web3 from "@solana/web3.js";
import * as token from "@solana/spl-token";

import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { Offering } from "../target/types/offering";

const TREASURY_WALLET = "621i9tL4tRBgt2PRbHynqSdYxPEd3KvpVkKX3chge3mU";

export async function createNewMint(connection: web3.Connection, payer: web3.Keypair, mintAuthority: web3.PublicKey, freezeAuthority: web3.PublicKey, decimals: number): Promise<web3.PublicKey> {
  const tokenMint = await token.createMint(connection, payer, mintAuthority, freezeAuthority, decimals);

  console.log(`Token Mint: https://explorer.solana.com/address/${tokenMint}?cluster=devnet`);

  return tokenMint;
}

describe("offering", () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env();
  const connection = provider.connection;
  anchor.setProvider(provider);

  const program = anchor.workspace.Offering as Program<Offering>;

  const payer: web3.Keypair = (provider.wallet as any).payer;
  const admin = anchor.web3.Keypair.generate();
  const buyer = anchor.web3.Keypair.generate();

  let mintUSDT;

  const getPdaParams = async (connection: anchor.web3.Connection, signer: anchor.web3.PublicKey): Promise<any> => {
    const uid = new anchor.BN(parseInt((Date.now() / 1000).toString()));
    const uidBuffer = uid.toBuffer("le", 8);

    let [statePubKey, stateBump] = await anchor.web3.PublicKey.findProgramAddress([Buffer.from("state"), signer.toBuffer(), uidBuffer], program.programId);
    return {
      stateBump,

      idx: uid,
      stateKey: statePubKey
    };
  };

  it("Initialize", async () => {
    mintUSDT = await createNewMint(connection, payer, admin.publicKey, admin.publicKey, 6);
    expect(mintUSDT.toBase58());
  });

  it("Setup", async () => {
    const pda = await getPdaParams(connection, provider.wallet.publicKey);

    const tx = await program.methods.setTreasury(new anchor.BN(pda.idx)).accounts({
      signer: provider.wallet.publicKey,
      systemProgram: anchor.web3.SystemProgram.programId,
      applicationState: pda.stateKey,
      treasury: new anchor.web3.PublicKey(TREASURY_WALLET)
    }).rpc();

    const applicationState = await program.account.state.fetch(pda.stateKey);
    console.log(applicationState.treasury.toBase58())
  });

  it("Buying", async () => {
    // const tx = await program.methods.setTreasury(101).accounts({ user: provider.wallet.publicKey }).rpc();
  });
});
