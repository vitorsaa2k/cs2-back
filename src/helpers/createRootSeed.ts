import { Seed } from "../models/SeedModel";
import { generateSeed, returnPublicHash } from "../utils/provablyFair";

async function createRootSeed(userId: string) {
	const clientSeed = generateSeed(4);
	const serverSeed = generateSeed(16);
	const secretSalt = generateSeed(8);
	const publicHash = returnPublicHash(serverSeed, secretSalt);
	const nonce = 1;
	const dateRange = new Date().toString();
	const seeds = [{ serverSeed, secretSalt, publicHash, nonce, dateRange }];
	const rootSeed = new Seed({ userId, clientSeed, seeds });
	await rootSeed.save();
	return rootSeed;
}

export { createRootSeed };
