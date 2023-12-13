import { Seed } from "../models/SeedModel";
import { generateSeed, returnPublicHash } from "../utils/provablyFair";

async function generateNewSeed(userId: string) {
	const rootSeed = await Seed.findOne({ userId });
	if (rootSeed) {
		const seed = rootSeed.seeds[rootSeed.seeds.length - 1];
		const serverSeed = generateSeed(16);
		const secretSalt = generateSeed(8);
		const publicHash = returnPublicHash(serverSeed, secretSalt);
		const nonce = seed.nonce + 1;
		const dateRange = new Date().toString();
		const newSeed = {
			serverSeed,
			secretSalt,
			publicHash,
			nonce,
			dateRange,
		};
		rootSeed.seeds.push(newSeed);
		await rootSeed.save();
	}
	return rootSeed;
}

export { generateNewSeed };
