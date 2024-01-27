import { Request, Response } from "express";
import { DrawnSkin, SkinType } from "../types/crateTypes";

const upgrade = async (req: Request, res: Response) => {
	const { userSkins, upgradeSkins } = req.body;
};

const getChance = async (req: Request, res: Response) => {
	const {
		userSkins,
		upgradeSkins,
	}: { userSkins: DrawnSkin[]; upgradeSkins: SkinType[] } = req.body;
	const userSkinsPrice = userSkins
		.map(s => s.price ?? 0)
		.reduce((a, b) => a + b, 0);
	const upgradeSkinsPrice = upgradeSkins
		.map(s => s.price ?? 0)
		.reduce((a, b) => a + b, 0);

	const chanceOfSuccess = (userSkinsPrice / upgradeSkinsPrice) * 0.9;
	res.status(200).json(chanceOfSuccess * 100);
};

export { getChance };
