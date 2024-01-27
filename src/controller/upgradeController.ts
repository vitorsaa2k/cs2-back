import { Request, Response } from "express";
import { DrawnSkin, SkinType } from "../types/crateTypes";
import { getUpgradeChance } from "../utils/getUpgradeChance";

const upgrade = async (req: Request, res: Response) => {
	const { userSkins, upgradeSkins } = req.body;
};

const getChance = async (req: Request, res: Response) => {
	const {
		userSkins,
		upgradeSkins,
	}: { userSkins: DrawnSkin[]; upgradeSkins: SkinType[] } = req.body;
	const chanceOfSuccess = getUpgradeChance(userSkins, upgradeSkins);
	res.status(200).json(chanceOfSuccess * 100);
};

export { getChance };
