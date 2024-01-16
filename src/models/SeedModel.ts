import { Schema, model } from "mongoose";

const seedSchema = new Schema({
	userId: { type: String, required: true },
	clientSeed: { type: String, required: true },
	seeds: [
		{
			serverSeed: { type: String, required: true },
			secretSalt: { type: String, required: true },
			publicHash: { type: String, required: true },
			nonce: { type: Number, default: 1 },
			dateRange: { type: String, required: true },
		},
	],
});

const Seed = model("Seed", seedSchema);

export { Seed };
