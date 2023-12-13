import { Inventory } from "../models/InventoryModel";
import { DrawnSkin } from "../types/crateTypes";

async function addSkinToInventory(skins: DrawnSkin[], userId: string) {
	const inventory = await Inventory.findOne({ id: userId });
	skins.forEach(skin => {
		inventory?.inventory.push(skin);
	});
	if (inventory) await inventory.save();
	return inventory;
}

export { addSkinToInventory };
