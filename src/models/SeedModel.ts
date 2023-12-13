import { Schema, model } from "mongoose";

const seedSchema = new Schema({
	userId: String,
	clientSeed: String,
	seeds: [
		{
			serverSeed: String,
			secretSalt: String,
			publicHash: String,
			nonce: { type: Number, default: 1 },
			dateRange: String,
		},
	],
});

const Seed = model("Seed", seedSchema);

export { Seed };
