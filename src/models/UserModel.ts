import { Schema, model } from "mongoose";

const userSchema = new Schema({
	provider: String,
	_json: {
		steamid: String,
		communityvisibilitystate: Number,
		profilestate: Number,
		personaname: String,
		commentpermission: Number,
		profileurl: String,
		avatar: String,
		avatarmedium: String,
		avatarfull: String,
		avatarhash: String,
		lastlogoff: Number,
		personastate: Number,
		realname: String,
		primaryclanid: String,
		timecreated: Number,
		personastateflags: Number,
	},
	id: String,
	displayName: String,
	photos: [
		{
			value: String,
		},
		{
			value: String,
		},
		{
			value: String,
		},
	],
	identifier: String,
	balance: Number,
});

const User = model("User", userSchema);

export { User };
