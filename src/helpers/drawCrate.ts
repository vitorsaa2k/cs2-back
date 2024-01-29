import { SkinType } from "./../types/crateTypes";
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
import { handleLiveDrop } from "./handleLiveDrop";

async function drawCrate(crate: CrateType, userId: string) {
	const rootSeed = await Seed.findOne({ userId });
	if (!rootSeed) return;
	const rollId = generateSeed(8);
	const seed = rootSeed.seeds[rootSeed.seeds.length - 1];
	if (seed.serverSeed && rootSeed.clientSeed) {
		const hash = combineAndHash(
			seed.serverSeed,
			rootSeed.clientSeed,
			seed.nonce
		);
		const roll = generateRandomNumber(hash);
		const skin = findSkinByRate(crate, roll);
		if (!skin) return;
		generateNewSeed(userId);
		saveRoll(rollId, seed, roll, crate.name, rootSeed.clientSeed);
		return { ...skin, rollId };
	}
}

export { drawCrate };
