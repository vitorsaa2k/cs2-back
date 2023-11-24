import { Schema, model } from "mongoose";

const crateSchema = new Schema({
	name: { type: String, default: "" },
	limitRate: { type: Number, default: 0 },
	skins: { type: Array, default: [] },
});

const Crate = model("Crate", crateSchema);

export { Crate };
