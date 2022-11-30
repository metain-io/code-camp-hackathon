import * as web3 from "@solana/web3.js";
import * as fs from "fs";
import base58 from "bs58";
import dotenv from "dotenv";
dotenv.config();

export async function initializeKeypair(connection: web3.Connection): Promise<web3.Keypair> {
  if (!process.env.PRIVATE_KEY) {
    console.log("Creating .env file");
    const signer = web3.Keypair.generate();
    fs.writeFileSync(".env", `PRIVATE_KEY=${base58.encode(signer.secretKey)}`);
    await airdropSolIfNeeded(signer, connection);

    return signer;
  }

  const secretKey = base58.decode(process.env.PRIVATE_KEY);
  console.log(secretKey.toString());
  const keypairFromSecretKey = web3.Keypair.fromSecretKey(secretKey);
  await airdropSolIfNeeded(keypairFromSecretKey, connection);
  return keypairFromSecretKey;
}

async function airdropSolIfNeeded(signer: web3.Keypair, connection: web3.Connection) {
  const balance = await connection.getBalance(signer.publicKey);
  console.log("Current balance is", balance);
  const minimum = Math.floor(web3.LAMPORTS_PER_SOL / 2);
  if (balance < minimum) {
    console.log("Airdropping 1 SOL...");
    await connection.requestAirdrop(signer.publicKey, minimum);
  }
}
