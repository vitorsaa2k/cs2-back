import { Crate } from "../models/CrateModel";
import { CrateType } from "../types/crateTypes";
import { Request, Response } from "express";

export const handleOpenCreate = async (req: Request, res: Response) => {
	function drawCrate(crate: CrateType) {
		const rate = Math.floor(Math.random() * crate.limitRate + 1);
		const skin = crate.skins.find(
			skin => skin.maxRate >= rate && skin.minRate <= rate
		);
		if (!skin)
			return {
				message:
					"the number drawn does not have a number equivalent to a weapon",
				error: true,
			};

		var wear = skin.wear
			? skin.wear.find(wear => rate <= wear.wearRate)
			: "default-Wear";

		const drawnSkin = { ...skin };
		delete drawnSkin.wear;
		return { skin, wear };
	}

	if (req.params) {
		const { name } = req.params;
		try {
			const crate = await Crate.find({ name: name.toLowerCase() });
			if (crate) {
				const skin = drawCrate(crate[0]);
				res.status(200).json(skin.skin); // Front end is not handling the wear yet
			}
		} catch (err) {
			console.log(err);
		}
	}
};

export const getCrateByName = async (req: Request, res: Response) => {
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

export const addCaseToDB = async (req: Request, res: Response) => {
	try {
		const crate = new Crate(req.body);
		await crate.save();
		res.status(200).json(crate);
	} catch (error) {
		console.log(error);
	}
};
