import { Inventory } from "../models/InventoryModel";
import { DrawnSkin } from "../types/crateTypes";
import { handleLiveDrop } from "./handleLiveDrop";

async function addSkinsToInventory(skins: DrawnSkin[], userId: string) {
	const inventory = await Inventory.findOne({ id: userId });
	if (!inventory) return;
	skins.forEach(skin => {
		inventory?.inventory.push(skin);
	});
	handleLiveDrop(skins, userId);
	await inventory.save();
	return inventory;
}

export { addSkinsToInventory };
