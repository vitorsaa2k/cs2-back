import { Crate } from "../models/CrateModel";
import { CrateType } from "../types/crateTypes";
import { Request, Response } from "express";

const handleCrateOpen = async (req: Request, res: Response) => {
	if (req.params) {
		const { name } = req.params;
		try {
			const crate = await Crate.find({ name: name.toLowerCase() });
			if (crate) {
				var drawnResult = drawCrate(crate[0]);
				console.log(drawnResult);
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
		const crate = await Crate.find({ name: name.toLowerCase() });
		if (crate) {
			res.status(200).json(crate[0]);
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
	try {
		const crate = new Crate(req.body);
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
