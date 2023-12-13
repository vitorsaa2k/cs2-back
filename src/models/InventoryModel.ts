import { Schema, model } from "mongoose";

const inventorySchema = new Schema({
	id: String,
	inventory: [
		{
			name: String,
			icon_url: String,
			classid: String,
			exterior: String,
			gun_type: String,
			price: Number,
			rarity_color: String,
			color: String,
			rollId: String,
		},
	],
});

const Inventory = model("Inventory", inventorySchema);

export { Inventory };
