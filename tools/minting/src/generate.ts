import * as fs from "fs";
import * as web3 from "@solana/web3.js";
import yargs from "yargs/yargs";

import { initializeKeypair } from "./initializeKeypair";
import { createNewMint, waitMs } from "./common";

const argv = yargs(process.argv.slice(2))
  .options({
    env: { type: "string", default: false }
  })
  .parseSync();

const env = argv.env || "devnet";

function createConnection() {
  switch (env) {
    case "local":
      return new web3.Connection("http://127.0.0.1:8899");
  }

  return new web3.Connection(web3.clusterApiUrl("devnet"));
}

async function main() {
  const connection = createConnection();
  const user = await initializeKeypair(connection);

  const [mintUSDT, mintUSDC, mintVOT1] = await Promise.allSettled([createNewMint(connection, user, user.publicKey, user.publicKey, 6), createNewMint(connection, user, user.publicKey, user.publicKey, 6), createNewMint(connection, user, user.publicKey, user.publicKey, 0)]);

  await waitMs(1000);

  fs.writeFileSync(
    `_mint_${env}.json`,
    JSON.stringify({
      USDT: mintUSDT.status === "fulfilled" ? mintUSDT.value : "",
      USDC: mintUSDC.status === "fulfilled" ? mintUSDC.value : "",
      VOT1: mintVOT1.status === "fulfilled" ? mintVOT1.value : ""
    })
  );
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
