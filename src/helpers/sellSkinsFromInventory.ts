import { Inventory } from "../models/InventoryModel";
import { addBalanceUser } from "./addBalanceUser";

async function sellSkinsFromInventory(userId: string, rollId: string[]) {
	const userInventory = await Inventory.findOne({ id: userId });

	if (userInventory) {
		const totalBalanceToAdd = userInventory.inventory
			.filter(skin => rollId.find(id => id === skin.rollId))
			.map(skin => skin.price ?? 0)
			.reduce((prevValue, currValue) => prevValue + currValue, 0);
		const newInventory = userInventory.inventory.filter(
			skin => skin.rollId !== rollId.find(id => id === skin.rollId)
		);
		addBalanceUser(userId, totalBalanceToAdd);
		userInventory.inventory = newInventory;
		await userInventory.save();
		return userInventory;
	}
}

export { sellSkinsFromInventory };
