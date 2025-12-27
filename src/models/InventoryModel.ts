import { Schema, model } from "mongoose";
import { skinSchema } from "./SkinModel";

const inventorySchema = new Schema({
	id: String,
	inventory: [skinSchema],
});

const Inventory = model("Inventory", inventorySchema);

export { Inventory };
