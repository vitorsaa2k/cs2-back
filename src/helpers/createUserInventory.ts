import { Inventory } from "../models/InventoryModel";

async function createUserInventory(id: string) {
	const userInventory = new Inventory({ id, inventory: [] });
	await userInventory.save();

	return userInventory;
}

export { createUserInventory };
