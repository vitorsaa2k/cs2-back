import { Schema, model } from "mongoose";
import { skinSchema } from "./SkinModel";

const inventorySchema = new Schema({
	id: String,
	inventory: [skinSchema],
});

inventorySchema.path("inventory").schema.add({
	rollId: { type: String, required: true },
});

const Inventory = model("Inventory", inventorySchema);

export { Inventory };
