import { addSkinToInventory } from "../helpers/addSkinToInventory";
import { Crate } from "../models/CrateModel";
import { Skin } from "../models/SkinModel";
import { CrateType, SkinType, WearType } from "../types/crateTypes";
import { Request, Response } from "express";

const handleCrateOpen = async (req: Request, res: Response) => {
	const userId = req.user?.id ?? "";
	const totalToOpen = new Array(req.body.crateNumber).fill(0);
	if (req.params) {
		const { name } = req.params;
		try {
			const crate = await Crate.find({ name: name.toLowerCase() });
			if (crate) {
				const skins: SkinType[] = [];
				totalToOpen.forEach(() => {
					skins.push(drawCrate(crate[0]).skin!);
				});
				var drawnResult = drawCrate(crate[0]);
				if (drawnResult?.error) {
					res.status(400).json(drawnResult);
				} else {
					await addSkinToInventory(skins, userId);
					res.status(200).json(skins); //passing just skin because frontend is not handling wear yet
				}
			}
		} catch (err) {
			console.log(err);
		}
	}
};

const getCrateByName = async (req: Request, res: Response) => {
	const { name } = req.params;
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
	const skins: SkinType[] = [];
	totalToOpen.forEach(() => {
		totalSpent += req.body.crate.price;
		skins.push(drawCrate(crateToSend).skin!);
	});
	const playerProfit = skins
		.map(skin => skin?.price ?? 0)
		.reduce((prevValue, currValue) => prevValue + currValue, 0);
	const siteProfit = totalSpent - playerProfit;
	res.json({ skins, playerProfit, totalSpent, siteProfit });
};

export { getCrateByName, handleCrateOpen, addCrateToDB, simulateCrateOpening };

function drawCrate(crate: CrateType) {
	const rate = Math.floor(Math.random() * crate.limitRate + 1);
	const Drawnskin = crate.skins.find(
		skin => skin.maxRate >= rate && skin.minRate <= rate
	);
	if (!Drawnskin)
		return {
			message: "the number drawn does not have a number equivalent to a weapon",
			error: true,
		};

	var Wear = Drawnskin.wear
		? Drawnskin.wear.find(wear => rate <= wear.wearRate)
		: { wearType: "Default-Wear", wearRate: 2 };

	if (!Wear) {
		Wear = { wearType: "Default-Wear", wearRate: 2 };
	}
	const skin = { ...Drawnskin };
	let WearArray: WearType[] = [Wear];
	skin.wear = WearArray;
	return { skin };
}
function getRange(limit: number, chance: number, current: number) {
	return Math.floor((chance / 100) * limit) + current;
}
