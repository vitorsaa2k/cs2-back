import { Skin } from "../models/SkinModel";
import { Request, Response } from "express";
import { filterArrayForPage } from "../utils/filterArrayForPage";

const addSkin = async (req: Request, res: Response) => {
	const newSkin = new Skin(req.body);
	const skin = await Skin.findOne({ name: req.body.name });
	if (skin) {
		res
			.status(403)
			.json({ error: { message: "This skin is already on the Db" } });
	} else {
		await newSkin.save();
		res.status(200).json({ message: "skin created" });
	}
};

const removeAllSkins = async (req: Request, res: Response) => {
	await Skin.deleteMany({});
	res.send("All skins deleted").status(200);
};

const getSkinByRange = async (req: Request, res: Response) => {
	const maxPrice = parseInt((req.query.maxPrice as string) ?? "0");
	const page = req.query.page;
	const itemsPerPage = 12;
	const pageNumber = parseInt((page as string) ?? "0");
	if (maxPrice === 0) {
		try {
			const skin = await Skin.aggregate([
				{ $sort: { price: -1 } },
				{ $limit: itemsPerPage * pageNumber },
			]);
			const skinsToSend = filterArrayForPage(skin, pageNumber, itemsPerPage);
			if (skin) return res.status(200).json(skinsToSend);
		} catch (error) {
			console.log(error);
		}
	}

	if (maxPrice > 0) {
		const skin = await Skin.find({ price: { $lte: Number(maxPrice) } })
			.limit(itemsPerPage * pageNumber)
			.sort({ price: -1 });
		const skinsToSend = filterArrayForPage(skin, pageNumber, itemsPerPage);
		if (skin) return res.status(200).json(skinsToSend);
	}

	return res.status(400).json({ error: { message: "There was an error" } });
};

export { addSkin, removeAllSkins, getSkinByRange };
