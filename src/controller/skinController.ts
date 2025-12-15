import { Skin } from "../models/SkinModel";
import { Request, Response } from "express";
import { RarityNames, SortOptions } from "../types/types";
import { buildSkinsQuery } from "../utils/buildMatchSkinsQuery";

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
	const maxPrice = parseInt(req.query.maxPrice as string);
	const page = parseInt((req.query.page as string) ?? "1");
	const sort = req.query.sort as SortOptions;
	const name = req.query.name as string;
	const rarity = req.query.rarity as RarityNames;

	const itemsPerPage = 15;
	let maxPages = 0;
	const itemsToSkip = (page - 1) * itemsPerPage;

	const match = buildSkinsQuery(maxPrice, name, rarity);
	const skinsQueryPromise = Skin.aggregate([
		{
			$match: match,
		},
		{ $sort: { price: sort === "DESC" ? 1 : -1 } },
		{ $skip: itemsToSkip },
		{ $limit: itemsPerPage },
	]);
	const totalSkinsPromise = Skin.countDocuments({
		...match,
	});

	try {
		const [skin, total] = await Promise.all([
			skinsQueryPromise,
			totalSkinsPromise,
		]);
		maxPages = Math.ceil(total / itemsPerPage);
		if (skin)
			return res.status(200).json({
				skins: skin,
				pagination: {
					page: page,
					itemsPerPage,
					totalItems: skin.length,
					maxPages: maxPages,
				},
			});
	} catch (error) {
		console.log(error);
	}

	return res.status(400).json({ error: { message: "There was an error" } });
};

export { addSkin, removeAllSkins, getSkinByRange };
