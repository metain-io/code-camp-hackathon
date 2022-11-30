import * as web3 from "@solana/web3.js";
import * as token from "@solana/spl-token";

export function waitMs (ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function getMint(connection: web3.Connection, address: web3.PublicKey): Promise<token.Mint> {
  return token.getMint(connection, address);
}

export async function createNewMint(connection: web3.Connection, payer: web3.Keypair, mintAuthority: web3.PublicKey, freezeAuthority: web3.PublicKey, decimals: number): Promise<web3.PublicKey> {
  const tokenMint = await token.createMint(connection, payer, mintAuthority, freezeAuthority, decimals);

  console.log(`Token Mint: https://explorer.solana.com/address/${tokenMint}?cluster=devnet`);

  return tokenMint;
}

export async function createTokenAccount(connection: web3.Connection, payer: web3.Keypair, mint: web3.PublicKey, owner: web3.PublicKey) {
  const tokenAccount = await token.getOrCreateAssociatedTokenAccount(connection, payer, mint, owner);

  console.log(`Token Account: https://explorer.solana.com/address/${tokenAccount.address}?cluster=devnet`);

  return tokenAccount;
}

export async function mintTokens(connection: web3.Connection, payer: web3.Keypair, mint: web3.PublicKey, destination: web3.PublicKey, authority: web3.Keypair, amount: number|bigint) {
  const transactionSignature = await token.mintTo(connection, payer, mint, destination, authority, amount);

  console.log(`Mint Token Transaction: https://explorer.solana.com/tx/${transactionSignature}?cluster=devnet`);
}

export async function transferTokens(connection: web3.Connection, payer: web3.Keypair, source: web3.PublicKey, destination: web3.PublicKey, owner: web3.Keypair, amount: number) {
  const transactionSignature = await token.transfer(connection, payer, source, destination, owner, amount);

  console.log(`Transfer Transaction: https://explorer.solana.com/tx/${transactionSignature}?cluster=devnet`);
}

export async function burnTokens(connection: web3.Connection, payer: web3.Keypair, account: web3.PublicKey, mint: web3.PublicKey, owner: web3.Keypair, amount: number) {
  const transactionSignature = await token.burn(connection, payer, account, mint, owner, amount);

  console.log(`Burn Transaction: https://explorer.solana.com/tx/${transactionSignature}?cluster=devnet`);
}
