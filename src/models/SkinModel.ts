import { Schema, model } from "mongoose";

export const skinSchema = new Schema({
	id: String,
	skin_id: String,
	name: String,
	weapon: {
		name: String,
		weapon_id: Number,
	},
	category: {
		id: String,
		name: String,
	},
	pattern: {
		id: String,
		name: String,
	},
	wear: { name: String },
	rarity: {
		id: String,
		name: String,
		color: String,
	},
	market_hash_name: String,
	image: String,
	stattrak: Boolean,
	price: Number,
});

const Skin = model("Skin", skinSchema);

export { Skin };
