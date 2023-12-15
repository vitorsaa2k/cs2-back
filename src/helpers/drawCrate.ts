import { Seed } from "../models/SeedModel";
import { CrateType } from "../types/crateTypes";
import { findSkinByRate } from "../utils/findSkinByRate";
import {
	combineAndHash,
	generateRandomNumber,
	generateSeed,
} from "../utils/provablyFair";
import { generateNewSeed } from "./generateNewSeed";
import { saveRoll } from "./saveRoll";

async function drawCrate(crate: CrateType, userId: string) {
	const rootSeed = await Seed.findOne({ userId });
	const rollId = generateSeed(8);
	const seed = rootSeed?.seeds[rootSeed.seeds.length - 1];
	if (rootSeed && seed && seed.serverSeed && rootSeed.clientSeed) {
		const hash = combineAndHash(
			seed.serverSeed,
			rootSeed.clientSeed,
			seed.nonce
		);
		const roll = generateRandomNumber(hash);
		await Promise.all([
			saveRoll(rollId, seed, roll, crate.name, rootSeed.clientSeed),
			generateNewSeed(userId),
		]);
		const skin = findSkinByRate(crate, roll);
		return { ...skin, rollId };
	}
}

export { drawCrate };
