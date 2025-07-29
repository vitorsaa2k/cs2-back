import { Schema, model } from "mongoose";

const userSchema = new Schema({
	provider: String,
	emails: [
		{
			value: String,
			verified: Boolean,
		},
	],
	id: String,
	displayName: String,
	photos: [
		{
			value: String,
		},
	],
	balance: { type: Number, default: 0 },
});

const User = model("User", userSchema);

export { User };
