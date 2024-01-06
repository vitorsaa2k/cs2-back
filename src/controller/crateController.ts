import { addSkinToInventory } from "../helpers/addSkinToInventory";
import { drawCrate } from "../helpers/drawCrate";
import { Crate } from "../models/CrateModel";
import { Roll } from "../models/RollModel";
import { Skin } from "../models/SkinModel";
import { CrateSkin, CrateType, DrawnSkin } from "../types/crateTypes";
import { Request, Response } from "express";
import { simulateDraw } from "../utils/simulateDraw";
import { removeBalanceUser } from "../helpers/removeBalanceUser";
import { drawMultipleCrate } from "../helpers/drawMultipleCrate";

const handleCrateOpen = async (req: Request, res: Response) => {
	if (!req.user)
		return res.status(401).json({ error: true, message: "Unauthorized" });
	const userId = req.user.id;
	const totalToOpen = new Array(req.body.crateNumber).fill(0);
	if (req.params) {
		let { name } = req.params;
		name = name.replace(/\s+/g, "");
		try {
			const crate = await Crate.findOne({ name: name.toLowerCase() });
			if (!crate)
				return res
					.status(404)
					.json({ error: true, message: "this crate doesn't exists" });
			const totalBalanceToRemove = crate.price * req.body?.crateNumber ?? 1;
			if (req.user.balance < totalBalanceToRemove)
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
				addSkinToInventory(skins, userId),
			];
			Promise.all(userPromises);
			res.status(200).json(skins);
		} catch (err) {
			console.log(err);
		}
	}
};

const getCrateByName = async (req: Request, res: Response) => {
	let { name } = req.params;
	try {
		const crate = await Crate.findOne({ name });
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
const addCrateToDB = async (req: Request, res: Response) => {
	const crateToSend: CrateType = {
		name: req.body.name,
		limitRate: req.body.limitRate,
		price: req.body.price,
		skins: [],
	};
	let maxRate = 0;
	for (const skin of req.body.skins) {
		let minRate = maxRate;
		maxRate = getRange(req.body.limitRate, skin.chance, minRate);
		const parsedSkin = await Skin.findOne({ name: skin.name });
		const crateSkin: CrateSkin = {
			name: parsedSkin?.name,
			icon_url: parsedSkin?.icon_url,
			classid: parsedSkin?.classid,
			exterior: parsedSkin?.exterior,
			gun_type: parsedSkin?.gun_type,
			price: parsedSkin?.price,
			rarity_color: parsedSkin?.rarity_color,
			color: skin.color,
			minRate: minRate,
			maxRate: maxRate,
		};
		if (parsedSkin) {
			crateToSend.skins.push(crateSkin);
		} else {
			res.status(404).json({ message: `Could not find skin: ${skin.name}` });
		}
	}
	try {
		const crate = new Crate(crateToSend);
		await crate.save();
		res.status(200).json(crate);
	} catch (error) {
		console.log(error);
	}
};

const simulateCrateOpening = async (req: Request, res: Response) => {
	const totalToOpen = new Array(req.body.crateNumber).fill(0);
	const crateToSend: CrateType = {
		name: req.body.crate.name,
		limitRate: req.body.crate.limitRate,
		price: req.body.crate.price,
		skins: [],
	};
	let maxRate = 0;
	for (const skin of req.body.crate.skins) {
		let minRate = maxRate;
		maxRate = getRange(req.body.crate.limitRate, skin.chance, minRate);
		const parsedSkin = await Skin.findOne({ name: skin.name });
		const crateSkin: CrateSkin = {
			name: parsedSkin?.name,
			icon_url: parsedSkin?.icon_url,
			classid: parsedSkin?.classid,
			exterior: parsedSkin?.exterior,
			gun_type: parsedSkin?.gun_type,
			price: parsedSkin?.price,
			rarity_color: parsedSkin?.rarity_color,
			color: skin.color,
			minRate: minRate,
			maxRate: maxRate,
		};
		if (parsedSkin) {
			crateToSend.skins.push(crateSkin);
		} else {
			res.status(404).json({ message: `Could not find skin: ${skin.name}` });
		}
	}
	let totalSpent = 0;
	const skins: DrawnSkin[] = [];
	totalToOpen.forEach(() => {
		totalSpent += req.body.crate.price;
		const skin: DrawnSkin = simulateDraw(crateToSend);
		skins.push(skin);
	});
	const playerProfit = skins
		.map(skin => skin?.price ?? 0)
		.reduce((prevValue, currValue) => prevValue + currValue, 0);
	const siteProfit = totalSpent - playerProfit;
	res.json({ skins, playerProfit, totalSpent, siteProfit });
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

export {
	getCrateByName,
	handleCrateOpen,
	addCrateToDB,
	simulateCrateOpening,
	getRollById,
};

function getRange(limit: number, chance: number, current: number) {
	return Math.floor((chance / 100) * limit) + current;
}
