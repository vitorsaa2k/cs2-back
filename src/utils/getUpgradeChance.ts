import { DrawnSkin, SkinType } from "../types/crateTypes";

export function getUpgradeChance(
	userSkins: DrawnSkin[],
	upgradeSkins: SkinType[]
): number {
	const userSkinsPrice = userSkins
		.map(s => s.price ?? 0)
		.reduce((a, b) => a + b, 0);
	const upgradeSkinsPrice = upgradeSkins
		.map(s => s.price ?? 0)
		.reduce((a, b) => a + b, 0);

	const chanceOfSuccess = (userSkinsPrice / upgradeSkinsPrice) * 0.9;
	return chanceOfSuccess;
}
