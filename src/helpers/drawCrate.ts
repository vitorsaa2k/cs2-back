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
	const rollId = generateSeed(8);
	const seed = rootSeed?.seeds[rootSeed.seeds.length - 1];
	if (rootSeed && seed && seed.serverSeed && rootSeed.clientSeed) {
		const hash = combineAndHash(
			seed.serverSeed,
			rootSeed.clientSeed,
			seed.nonce
		);
		const roll = generateRandomNumber(hash);
		saveRoll(rollId, seed, roll, crate.name, rootSeed.clientSeed);
		generateNewSeed(userId);
		const skin = findSkinByRate(crate, roll);
		if (skin) {
			handleLiveDrop([{ ...skin, rollId }], userId);
		}
		return { ...skin, rollId };
	}
}

export { drawCrate };
