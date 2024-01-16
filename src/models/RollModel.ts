import { Schema, model } from "mongoose";

const rollSchema = new Schema({
	rollId: { type: String, required: true },
	crateName: { type: String, required: true },
	clientSeed: { type: String, required: true },
	serverSeed: { type: String, required: true },
	secretSalt: { type: String, required: true },
	publicHash: { type: String, required: true },
	nonce: { type: Number, required: true },
	roll: { type: Number, required: true },
	dateRange: { type: String, required: true },
});

const Roll = model("Roll", rollSchema);

export { Roll };
