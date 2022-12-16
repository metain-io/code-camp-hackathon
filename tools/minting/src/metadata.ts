import path from "path";
import * as fs from "fs";
import * as web3 from "@solana/web3.js";
import * as token from "@solana/spl-token";

import { Metaplex, keypairIdentity, bundlrStorage, Nft, Sft, toMetaplexFile } from "@metaplex-foundation/js";

import base58 from "bs58";
import yargs from "yargs/yargs";

import { initializeKeypair } from "./initializeKeypair";
import { createNewMint, createTokenAccount, mintTokens, waitMs } from "./common";
import { getMint } from "@solana/spl-token";

const argv = yargs(process.argv.slice(2))
  .options({
    env: { type: "string", default: false }
  })
  .parseSync();

const env = argv.env || "devnet";

let METAPLEX: Metaplex;

async function main() {
  const mintData = JSON.parse(fs.readFileSync(`_mint_${env}.json`, "ascii"));

  const providerUrl = web3.clusterApiUrl("devnet");
  const connection = new web3.Connection(providerUrl);
  const user = await initializeKeypair(connection);

  METAPLEX = Metaplex.make(connection)
    .use(keypairIdentity(user))
    .use(
      bundlrStorage({
        providerUrl,
        address: "https://devnet.bundlr.network",
        timeout: 60000
      })
    );

  const NEW_METADATA = {
    imgType: "image/jpg",
    imgName: "Metain VOT1 NFT",
    description:
      "Nestled in a peaceful alley surrounding by tourism district, 10 mins walks to Bui Vien walkstreet and Ben Thanh Market, Tran Dinh Xu Apartment Building located at 42/2 Tran Dinh Xu street, Ward Co Giang, District 1, HCMC. It offers a good quality apartment services in CBD area. The project is 5 storeys with floor area 486.3sqm , provides 23 elegantly furnished serviced apartments and surrounded by a plenty of facilities such as a restaurant, residents’ lounge, fitness center, retail shops, nightlife walking street. its central location also offers convenient access to HCMC’s central business district, government offices and embassies.",
    attributes: [
      { trait_type: "Address", value: "42/2 Tran Dinh Xu street, Ward Co Giang, District 1, HCMC" },
      { trait_type: "Land area", value: "144.2 sqm" },
      { trait_type: "Rental Type", value: "Apartment for lease" },
      { trait_type: "Land tenure", value: "Freehold" },
      { trait_type: "Avg. Occupancy", value: "> 90%" },
      { trait_type: "Property Type", value: "Landed Residence" },
      { trait_type: "Rental income Payment inteval", value: "Quarterly" },
      { trait_type: "GFA", value: "468.3 sqm" },
      { trait_type: "NFT Price", value: "$10.00" },
      { trait_type: "NFA", value: "468.3 sqm" },
      { trait_type: "Fixed Total NFT Supply", value: "197,000" },
      { trait_type: "Number of units", value: "23" },
      { trait_type: "Portfolio value", value: "$1,970,000" },
      { trait_type: "Construction Year", value: "2019" }
    ]
  };

  const mintVOT1 = new web3.PublicKey(mintData.VOT1);

  // Upload Image
  const imgUri = await uploadImage(path.join(__dirname, "./resources"), "vot1.jpg");

  const newUri = await uploadMetadata(imgUri, NEW_METADATA.imgType, NEW_METADATA.imgName, NEW_METADATA.description, NEW_METADATA.attributes);

  const nft = await METAPLEX.nfts().findByMint({ mintAddress: mintVOT1 });
  if (!nft || !nft.json?.image) {
    throw new Error("Unable to find existing nft or image uri!");
  }

  await updateNft(nft, newUri, NEW_METADATA.imgName);
}

async function updateNft(nft: Nft | Sft, metadataUri: string, newName: string) {
  console.log(`Updating NFT`);

  await METAPLEX.nfts().update(
    {
      name: newName,
      nftOrSft: nft,
      uri: metadataUri
    },
    { commitment: "finalized" }
  );
  console.log(`   Success!🎉`);
  console.log(`   Updated NFT: https://explorer.solana.com/address/${nft.address}?cluster=devnet`);
}

async function uploadImage(filePath: string, fileName: string): Promise<string> {
  console.log(`Uploading Image`);

  const imgBuffer = fs.readFileSync(path.join(filePath, fileName));
  const imgMetaplexFile = toMetaplexFile(imgBuffer, fileName);
  const imgUri = await METAPLEX.storage().upload(imgMetaplexFile);
  console.log(`   Image URI:`, imgUri);
  return imgUri;
}

async function uploadMetadata(imgUri: string, imgType: string, nftName: string, description: string, attributes: { trait_type: string; value: string }[]) {
  const { uri } = await METAPLEX.nfts().uploadMetadata({
    name: nftName,
    description: description,
    image: imgUri,
    attributes: attributes,
    properties: {
      files: [
        {
          type: imgType,
          uri: imgUri
        }
      ]
    }
  });
  console.log("   Metadata URI:", uri);
  return uri;
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
