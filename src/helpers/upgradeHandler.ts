import { Seed } from "../models/SeedModel";
import { DrawnSkin, SkinType } from "../types/crateTypes";
import { getUpgradeChance } from "../utils/getUpgradeChance";
import {
	MAX_RANGE,
	combineAndHash,
	generateRandomNumber,
	generateSeed,
} from "../utils/provablyFair";
import { saveRoll } from "./saveRoll";

export async function upgradeHandler(
	userSkins: DrawnSkin[],
	upgradeSkins: SkinType[],
	userId: string,
) {
	const rootSeed = await Seed.findOne({ userId });
	if (!rootSeed) return;
	const chanceOfSuccess = getUpgradeChance(userSkins, upgradeSkins) * MAX_RANGE;
	const newSeed = generateSeed(8);
	const seed = rootSeed.seeds[rootSeed.seeds.length - 1];
	if (seed.serverSeed && rootSeed.clientSeed) {
		const hash = combineAndHash(newSeed, rootSeed.clientSeed, seed.nonce);
		const roll = generateRandomNumber(hash);
		const rollId = generateSeed(8);
		await saveRoll(
			rollId,
			seed,
			roll,
			"upgrade",
			rootSeed.clientSeed,
			"upgrade",
		);

		if (roll > chanceOfSuccess) return false;
		const skins: DrawnSkin[] = [];
		upgradeSkins.forEach(skin => {
			skins.push({ ...skin, rollId: generateSeed(8) });
		});
		return skins;
	}
}
