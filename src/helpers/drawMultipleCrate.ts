import { Seed } from "../models/SeedModel";
import { CrateType, DrawnSkin, RollSeed } from "../types/crateTypes";
import { findSkinByRate } from "../utils/findSkinByRate";
import {
	combineAndHash,
	generateRandomNumber,
	generateSeed,
	returnPublicHash,
} from "../utils/provablyFair";
import { generateNewSeed } from "./generateNewSeed";
import { saveRoll } from "./saveRoll";

async function drawMultipleCrate(
	crate: CrateType,
	userId: string,
	totalToOpen: number[]
) {
	const rootSeed = await Seed.findOne({ userId });
	if (rootSeed) {
		const seeds = rootSeed.seeds;
		let lastNonce = seeds[0].nonce;
		const clientSeed = rootSeed.clientSeed;
		totalToOpen.forEach(() => {
			const serverSeed = generateSeed(16);
			const secretSalt = generateSeed(8);
			const publicHash = returnPublicHash(serverSeed, secretSalt);
			lastNonce++;
			const dateRange = new Date().toString();
			seeds.push({
				serverSeed,
				secretSalt,
				publicHash,
				nonce: lastNonce,
				dateRange,
			});
		});
		seeds.pop();
		const rollsPromise: Promise<RollSeed | undefined>[] = [];
		const skins: DrawnSkin[] = [];
		for (let i = seeds.length - totalToOpen.length; i < seeds.length; i++) {
			const seed = seeds[i];
			const hash = combineAndHash(seed.serverSeed!, clientSeed!, seed.nonce);
			const roll = generateRandomNumber(hash);
			const rollId = generateSeed(8);
			const skin = findSkinByRate(crate, roll);
			if (skin) {
				skins.push({ ...skin, rollId });
				rollsPromise.push(
					saveRoll(rollId, seed, roll, crate.name, rootSeed.clientSeed || "", "crate")
				);
			} else {
				continue;
			}
		}
		Promise.all(rollsPromise);
		generateNewSeed(userId);
		return skins;
	}
}

export { drawMultipleCrate };
