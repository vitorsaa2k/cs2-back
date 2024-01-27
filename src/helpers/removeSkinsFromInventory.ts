import { Inventory } from "../models/InventoryModel";
import { DrawnSkin } from "../types/crateTypes";

async function removeSkinsFromInventory(skins: DrawnSkin[], userId: string) {
	const userInventory = await Inventory.findOne({ id: userId });
	if (!userInventory) return;
	const rollIds = skins.map(s => s.rollId);
	const newInventory = userInventory.inventory.filter(
		skin => skin.rollId !== rollIds.find(id => id === skin.rollId)
	);
	userInventory.inventory = newInventory;
	await userInventory.save();
	return userInventory;
}

export { removeSkinsFromInventory };
