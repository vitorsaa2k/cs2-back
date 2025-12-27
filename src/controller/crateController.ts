import { addSkinsToInventory } from "../helpers/addSkinsToInventory";
import { drawCrate } from "../helpers/drawCrate";
import { Crate } from "../models/CrateModel";
import { Roll } from "../models/RollModel";
import { Skin } from "../models/SkinModel";
import { CrateSkin, CrateType, DrawnSkin } from "../types/crateTypes";
import { Request, Response } from "express";
import { simulateDraw } from "../utils/simulateDraw";
import { removeBalanceUser } from "../helpers/removeBalanceUser";
import { drawMultipleCrate } from "../helpers/drawMultipleCrate";
import { User } from "../models/UserModel";

const handleCrateOpen = async (req: Request, res: Response) => {
	const user = await User.findOne({ id: req.user?.id });
	if (!req.user || !user)
		return res.status(401).json({ error: true, message: "Unauthorized" });
	const userId = req.user.id;
	const totalToOpen = new Array(req.body.crateNumber).fill(0);
	if (req.params) {
		const crateId = decodeURI(req.params.crateId);
		try {
			const crate = await Crate.findOne({ crateId });
			if (!crate)
				return res
					.status(404)
					.json({ error: true, message: "this crate doesn't exists" });
			const totalBalanceToRemove = crate.price * req.body?.crateNumber;
			if (user.balance < totalBalanceToRemove)
				return res
					.status(400)
					.json({ error: true, message: "Not enough balance" });
			let skins: DrawnSkin[] = [];
			if (totalToOpen.length < 2) {
				const skin = await drawCrate(crate, userId);
				if (!skin) return;
				skins = [skin];
			} else {
				const drawnSkins = await drawMultipleCrate(crate, userId, totalToOpen);
				if (!drawnSkins) return;
				skins = drawnSkins;
			}
			const userPromises = [
				removeBalanceUser(totalBalanceToRemove, userId),
				addSkinsToInventory(skins, userId),
			];
			Promise.all(userPromises);
			res.status(200).json(skins);
		} catch (err) {
			console.log(err);
		}
	}
};

const getCrateById = async (req: Request, res: Response) => {
	let { crateId } = req.params;
	try {
		const crate = await Crate.findOne({ crateId });
		if (crate) {
			res.status(200).json(crate);
		} else {
			res.status(404).json({
				message: "This crate does not exist",
				error: true,
			});
		}
	} catch (error) {
		console.log(error);
	}
};

const getRollById = async (req: Request, res: Response) => {
	const { rollId } = req.params;
	const roll = await Roll.findOne({ rollId });
	if (roll) {
		res.json(roll);
	} else {
		res.status(404).json({ error: true, message: "Roll not found" });
	}
};

export { getCrateById, handleCrateOpen, getRollById };

function getRange(limit: number, chance: number, current: number) {
	return Math.floor((chance / 100) * limit) + current;
}
