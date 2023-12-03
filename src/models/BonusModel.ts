import crypto from "crypto";
import { Schema, model } from "mongoose";

const bonusSchema = new Schema({
	userId: String,
	code: { type: String, default: crypto.randomBytes(20).toString("hex") },
	percentage: { type: Number, default: 0.1 },
	dateCreated: { type: String, default: new Date() },
});

const Bonus = model("Bonus", bonusSchema);

export { Bonus };
