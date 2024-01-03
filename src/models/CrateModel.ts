import { Schema, model } from "mongoose";

const crateSchema = new Schema({
	name: { type: String, unique: true, default: "" },
	isActive: { type: Boolean, default: false },
	limitRate: { type: Number, default: 0 },
	price: { type: Number, default: 0 },
	skins: { type: Array, default: [] },
});

const Crate = model("Crate", crateSchema);

export { Crate };
