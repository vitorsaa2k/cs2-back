import { Request, Response } from "express";
import { User } from "../models/UserModel";
import { Inventory } from "../models/InventoryModel";

const getUser = async (req: Request, res: Response) => {
	const id = req.user?.id;
	console.log(req.user);
	console.log(JSON.stringify(req.cookies));
	const user = await User.findOne({ id });
	if (!user) {
		res.json(null);
	} else {
		res.json(user);
	}
};

const getUserInventory = async (req: Request, res: Response) => {
	const id = req.user?.id;
	const inventory = await Inventory.findOne({ id });

	if (inventory) {
		res.status(200).json(inventory);
	} else {
		res.status(404).json({ error: true, message: "Could not find inventory" });
	}
};

export { getUser, getUserInventory };
