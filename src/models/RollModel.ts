import { Schema, model } from "mongoose";

const rollSchema = new Schema({
	rollId: String,
	crateName: String,
	clientSeed: String,
	serverSeed: String,
	secretSalt: String,
	publicHash: String,
	nonce: Number,
	roll: Number,
	dateRange: String,
});

const Roll = model("Roll", rollSchema);

export { Roll };
