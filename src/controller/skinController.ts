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

const getSkinByName = async (req: Request, res: Response) => {
	const { name } = req.params;
	if (name.length > 0) {
		const skin = await Skin.find({ name: { $regex: name, $options: "i" } });
		res.status(200).json(skin);
	} else res.json([]);
};

export { addSkin, removeAllSkins, getSkinByName };
