import { Skin } from "../models/SkinModel";
import { Request, Response } from "express";

const addSkin = async (req: Request, res: Response) => {
	const newSkin = new Skin(req.body);
	const skin = await Skin.findOne({ name: req.body.name });
	if (skin) {
		res.status(400).json({ error: true });
	} else {
		await newSkin.save();
		res.status(200).json({ message: "skin created" });
	}
};

const removeAllSkins = async (req: Request, res: Response) => {
	await Skin.deleteMany({});
	res.send("All skins deleted").status(200);
};

export { addSkin, removeAllSkins };
