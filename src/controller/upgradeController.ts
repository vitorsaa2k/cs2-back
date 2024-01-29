import { Request, Response } from "express";
import { DrawnSkin, SkinType } from "../types/crateTypes";
import { getUpgradeChance } from "../utils/getUpgradeChance";
import { upgradeHandler } from "../helpers/upgradeHandler";
import { removeSkinsFromInventory } from "../helpers/removeSkinsFromInventory";
import { addSkinsToInventory } from "../helpers/addSkinsToInventory";

const upgrade = async (req: Request, res: Response) => {
	if (!req.user)
		return res.status(403).json({ error: { message: "user not found" } });
	const {
		userSkins,
		upgradeSkins,
	}: { userSkins: DrawnSkin[]; upgradeSkins: SkinType[] } = req.body;
	const upgradeResult = await upgradeHandler(
		userSkins,
		upgradeSkins,
		req.user.id
	);
	await removeSkinsFromInventory(userSkins, req.user.id);
	if (upgradeResult) {
		await addSkinsToInventory(upgradeResult, req.user.id);
	}
	return res.status(200).json(upgradeResult);
};

const getChance = async (req: Request, res: Response) => {
	const {
		userSkins,
		upgradeSkins,
	}: { userSkins: DrawnSkin[]; upgradeSkins: SkinType[] } = req.body;
	if (userSkins.length === 0 || upgradeSkins.length === 0)
		return res.status(200).json(0);
	const chanceOfSuccess = getUpgradeChance(userSkins, upgradeSkins);
	res.status(200).json(chanceOfSuccess * 100);
};

export { getChance, upgrade };
