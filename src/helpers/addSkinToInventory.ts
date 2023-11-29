import { Inventory } from "../models/InventoryModel";
import { SkinType } from "../types/crateTypes";

async function addSkinToInventory(skin: SkinType, id: string) {
	const inventory = await Inventory.findOne({ id });
	inventory?.inventory.push(skin);
	if (inventory) await inventory.save();
}

export { addSkinToInventory };
