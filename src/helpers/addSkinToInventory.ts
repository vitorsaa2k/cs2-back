import { Inventory } from "../models/InventoryModel";
import { SkinType } from "../types/crateTypes";

async function addSkinToInventory(skins: SkinType[], id: string) {
	const inventory = await Inventory.findOne({ id });
	skins.forEach(skin => {
		delete skin.minRate;
		delete skin.maxRate;
		inventory?.inventory.push(skin);
	});
	if (inventory) await inventory.save();
}

export { addSkinToInventory };
