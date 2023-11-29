import { Crate } from "../models/CrateModel";
import { Skin } from "../models/SkinModel";
import { CrateType, SkinType } from "../types/crateTypes";
import { Request, Response } from "express";

const handleCrateOpen = async (req: Request, res: Response) => {
	if (req.params) {
		const { name } = req.params;
		try {
			const crate = await Crate.find({ name: name.toLowerCase() });
			if (crate) {
				var drawnResult = drawCrate(crate[0]);
				if (drawnResult?.error) {
					res.status(400).json(drawnResult);
				} else {
					res.status(200).json(drawnResult.skin); //passing just skin because frontend is not handling wear yet
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
		skins: [],
	};

	for (const skin of req.body.skins) {
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
			minRate: skin.minRate,
			maxRate: skin.maxRate,
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

export { getCrateByName, handleCrateOpen, addCrateToDB };

function drawCrate(crate: CrateType) {
	const rate = Math.floor(Math.random() * crate.limitRate + 1);
	const skin = crate.skins.find(
		skin => skin.maxRate >= rate && skin.minRate <= rate
	);
	if (!skin)
		return {
			message: "the number drawn does not have a number equivalent to a weapon",
			error: true,
		};

	var wear = skin.wear
		? skin.wear.find(wear => rate <= wear.wearRate)
		: "default-Wear";

	const drawnSkin = { ...skin };
	delete drawnSkin.wear;
	return { skin, wear };
}
