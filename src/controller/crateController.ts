import { addSkinToInventory } from "../helpers/addSkinToInventory";
import { drawCrate } from "../helpers/drawCrate";
import { Crate } from "../models/CrateModel";
import { Roll } from "../models/RollModel";
import { Skin } from "../models/SkinModel";
import { CrateType, DrawnSkin, SkinType } from "../types/crateTypes";
import { Request, Response } from "express";
import { simulateDraw } from "../utils/simulateDraw";

const handleCrateOpen = async (req: Request, res: Response) => {
	const userId = req.user?.id ?? "";
	const totalToOpen = new Array(req.body.crateNumber).fill(0);
	if (req.params) {
		let { name } = req.params;
		name = name.replace(/\s+/g, "");
		try {
			const crate = await Crate.find({ name: name.toLowerCase() });
			if (crate) {
				const skins: DrawnSkin[] = [];
				for (let i = 0; i < totalToOpen.length; i++) {
					const skin = await drawCrate(crate[0], userId);
					skin ? skins.push(skin) : null;
				}
				if (skins.length < totalToOpen.length) {
					res.status(400).json(skins);
				} else {
					await addSkinToInventory(skins, userId);
					res.status(200).json(skins);
				}
			}
		} catch (err) {
			console.log(err);
		}
	}
};

const getCrateByName = async (req: Request, res: Response) => {
	let { name } = req.params;
	name = name.replace(/\s+/g, "");
	try {
		const crate = await Crate.findOne({ name: name.toLowerCase() });
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
		const crateSkin: SkinType = {
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
		const crateSkin: SkinType = {
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
		skins.push(simulateDraw(crateToSend));
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
