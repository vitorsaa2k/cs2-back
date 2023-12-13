import { Request, Response } from "express";
import { User } from "../models/UserModel";
import { Inventory } from "../models/InventoryModel";
import { Seed } from "../models/SeedModel";

const getUser = async (req: Request, res: Response) => {
	const id = req.user?.id;
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

const getUserPublicSeeds = async (req: Request, res: Response) => {
	const userId = req.user?.id;
	const rootSeed = await Seed.findOne({ userId });
	if (rootSeed) {
		const seed = rootSeed.seeds[rootSeed.seeds.length - 1];
		const clientSeed = rootSeed.clientSeed;
		const publicHash = seed.publicHash;
		const nonce = seed.nonce;
		res.status(200).json({ clientSeed, publicHash, nonce });
	} else {
		res.status(404).json({ error: true, message: "Seed not found" });
	}
};

const getServerSeedHistory = async (req: Request, res: Response) => {
	const userId = req.user?.id;
	const rootSeed = await Seed.findOne({ userId });
	if (rootSeed) {
		rootSeed.seeds.pop();
		const prevSeeds = rootSeed.seeds;
		res.status(200).json(prevSeeds);
	} else {
		res.status(404).json({ error: true, message: "Seed not found" });
	}
};

export { getUser, getUserInventory, getUserPublicSeeds, getServerSeedHistory };
