import { Schema, model } from "mongoose";

const skinSchema = new Schema({
	name: String,
	marketable: Number,
	tradable: Number,
	classid: String,
	icon_url: String,
	icon_url_large: String,
	type: String,
	weapon_type: String,
	gun_type: String,
	exterior: String,
	rarity: String,
	rarity_color: String,
	price: Number,
});

const Skin = model("Skin", skinSchema);

export { Skin };
