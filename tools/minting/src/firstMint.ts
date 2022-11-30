import * as fs from "fs";
import * as web3 from "@solana/web3.js";
import base58 from "bs58";

import { initializeKeypair } from "./initializeKeypair";
import { createNewMint, createTokenAccount, mintTokens, waitMs } from "./common";
import { getMint } from "@solana/spl-token";

async function main() {
  const mintData = JSON.parse(fs.readFileSync("_mint.json", "ascii"));

  const connection = new web3.Connection(web3.clusterApiUrl("devnet"));
  const user = await initializeKeypair(connection);

  const amountToMint = 100000000000n * 1000000n;
  const mintUSDT = new web3.PublicKey(mintData.USDT);
  const mintUSDC = new web3.PublicKey(mintData.USDC);
  const mintVOT1 = new web3.PublicKey(mintData.VOT1);

  const [tokenAccountUSDT, tokenAccountUSDC, tokenAccountVOT1] = await Promise.all([
    createTokenAccount(
      connection,
      user,
      mintUSDT,
      user.publicKey
    ),
    createTokenAccount(
      connection,
      user,
      mintUSDC,
      user.publicKey
    ),
    createTokenAccount(
      connection,
      user,
      mintVOT1,
      user.publicKey
    )
  ]);

  await Promise.allSettled([
    mintTokens(connection, user, mintUSDT, tokenAccountUSDT.address, user, amountToMint),
    mintTokens(connection, user, mintUSDC, tokenAccountUSDC.address, user, amountToMint),
    mintTokens(connection, user, mintVOT1, tokenAccountVOT1.address, user, 200000)
  ]);
}

main()
  .then(() => {
    console.log("Finished successfully");
    process.exit(0);
  })
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
