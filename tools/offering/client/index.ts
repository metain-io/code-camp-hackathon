import * as fs from "fs";
import * as web3 from "@solana/web3.js";
import * as token from "@solana/spl-token";
import base58 from "bs58";
import yargs from "yargs/yargs";
import dotenv from "dotenv";
import * as anchor from "@project-serum/anchor";

import { createNewMint, createTokenAccount, getPdaParams, mintTokens, waitMs } from "./common";
import { IDL, Offering } from "../target/types/offering";

dotenv.config();

const TREASURY_ADDRESS = "621i9tL4tRBgt2PRbHynqSdYxPEd3KvpVkKX3chge3mU";
const APPLICATION_IDX = 1670006191;
const OFFERING_PROGRAM_ID = "EbgwApfZNUQxGEqG2uJV5wkBVTZomp1ccDu7BuFsDKdY";
const NFT_PRICE = 10;

let connection: web3.Connection;

let mintUSDT;
let mintUSDC;
let mintVOT1;

const argv = yargs(process.argv.slice(2))
  .options({
    env: { type: "string", default: false },
    cmd: { type: "string", default: "" }
  })
  .parseSync();

const ENV = argv.env || "devnet";

async function init () {
  const secretKey = base58.decode(process.env.TREASURY_PRIVATE_KEY!);
  const treasurer = new anchor.Wallet(web3.Keypair.fromSecretKey(secretKey));  

  const provider = new anchor.AnchorProvider(connection, treasurer, {});

  const [walletToTakeNft] = await Promise.all([
    createTokenAccount(
      connection,
      treasurer.payer,
      mintVOT1,
      treasurer.publicKey
    ),
    createTokenAccount(
      connection,
      treasurer.payer,
      mintUSDT,
      treasurer.publicKey
    ),
    createTokenAccount(
      connection,
      treasurer.payer,
      mintUSDC,
      treasurer.publicKey
    )
  ]);

  const nftTotalSupply = await connection.getTokenAccountBalance(walletToTakeNft.address);
  console.log("NFT TOTAL SUPPLY:", nftTotalSupply.value.amount);
  
  const program = new anchor.Program(IDL, OFFERING_PROGRAM_ID, provider);
  const pdaUSDCVOT1 = await getPdaParams(program.programId, APPLICATION_IDX, treasurer.publicKey, mintUSDC, mintVOT1);
  const pda = pdaUSDCVOT1;

  const tx = await program.methods
    .depositNft(new anchor.BN(pda.idx), pda.stateBump, new anchor.BN(nftTotalSupply.value.amount), new anchor.BN(NFT_PRICE * 1000000))
    .accounts({
      treasurer: walletToTakeNft.owner,
      mintOfNft: mintVOT1,
      mintOfUsd: mintUSDC,        
      escrowNftWalletState: pda.escrowWalletKey,
      treasurerNftWallet: walletToTakeNft.address,
      applicationState: pda.stateKey,
      systemProgram: anchor.web3.SystemProgram.programId,
      tokenProgram: token.TOKEN_PROGRAM_ID,
      rent: anchor.web3.SYSVAR_RENT_PUBKEY
    })
    .signers([web3.Keypair.fromSecretKey(secretKey)])
    .rpc();

  const latestBlockHash = await connection.getLatestBlockhash();

  await connection.confirmTransaction({
    blockhash: latestBlockHash.blockhash,
    lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
    signature: tx
  });

  const nftRemainSupply = await connection.getTokenAccountBalance(pda.escrowWalletKey);
  console.log("NFT TOTAL SUPPLY:", nftRemainSupply.value.amount);  
}

async function buy () {
  const treasurerPublicKey = new web3.PublicKey(TREASURY_ADDRESS);

  const secretKey = base58.decode(process.env.BUYER_PRIVATE_KEY!);
  const buyer = new anchor.Wallet(web3.Keypair.fromSecretKey(secretKey));  

  const provider = new anchor.AnchorProvider(connection, buyer, {});

  const [buyerUsdWallet, treasurerUsdWallet, buyerNftWallet] = await Promise.all([
    createTokenAccount(connection, buyer.payer, mintUSDC, buyer.publicKey),
    createTokenAccount(connection, buyer.payer, mintUSDC, treasurerPublicKey),
    createTokenAccount(connection, buyer.payer, mintVOT1, buyer.publicKey)
  ]);

  const program = new anchor.Program(IDL, OFFERING_PROGRAM_ID, provider);
  const pdaUSDCVOT1 = await getPdaParams(program.programId, APPLICATION_IDX, treasurerPublicKey, mintUSDC, mintVOT1);
  const pda = pdaUSDCVOT1;

  const nftRemainSupply = await connection.getTokenAccountBalance(pda.escrowWalletKey);
  console.log("NFT CURRENT SUPPLY:", nftRemainSupply.value.amount);  

  const tx = await program.methods
    .buy(new anchor.BN(pda.idx), pda.stateBump, pda.escrowBump, new anchor.BN(1))
    .accounts({
      treasurer: treasurerPublicKey,        
      mintOfNft: mintVOT1,
      mintOfUsd: mintUSDC,
      escrowNftWalletState: pda.escrowWalletKey,
      buyer: buyerUsdWallet.owner,
      buyerUsdWallet: buyerUsdWallet.address,
      treasurerUsdWallet: treasurerUsdWallet.address,
      buyerNftWallet: buyerNftWallet.address,        
      applicationState: pda.stateKey,
      systemProgram: anchor.web3.SystemProgram.programId,
      tokenProgram: token.TOKEN_PROGRAM_ID
    })
    .signers([buyer.payer])
    .rpc();

  const latestBlockHash = await connection.getLatestBlockhash();

  await connection.confirmTransaction({
    blockhash: latestBlockHash.blockhash,
    lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
    signature: tx
  });

  const buyerNftCount = await connection.getTokenAccountBalance(buyerNftWallet.address);
  console.log("BUYER NFT COUNT:", buyerNftCount.value.amount);  
}

async function main () {
  const mintData = JSON.parse(fs.readFileSync(`../minting/_mint_${ENV}.json`, "ascii"));

  connection = new web3.Connection(web3.clusterApiUrl("devnet"));

  mintUSDT = new web3.PublicKey(mintData.USDT);
  mintUSDC = new web3.PublicKey(mintData.USDC);
  mintVOT1 = new web3.PublicKey(mintData.VOT1);

  switch (argv.cmd) {
    case "init":
      console.log("INIT");
      await init();
      break;

    case "buy":
      console.log("TEST BUY")
      await buy();
      break;

    default:
      console.log("EXIT");
      break;
  }
}

main();
