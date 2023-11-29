import { Schema, model } from "mongoose";

const inventorySchema = new Schema({
	id: String,
	inventory: Array,
});

const Inventory = model("Inventory", inventorySchema);

export { Inventory };
