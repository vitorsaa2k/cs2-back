import { Strategy } from "passport-steam";
import passport from "passport";
import { User } from "../models/UserModel";
import { UserType } from "../types/userTypes";
import { BACK_URL, FRONT_URL } from "./url";

// Use the SteamStrategy within Passport.
//   Strategies in passport require a `validate` function, which accept
//   credentials (in this case, an OpenID identifier and profile), and invoke a
//   callback with a user object.
passport.use(
	new Strategy(
		{
			returnURL: `${BACK_URL}/auth/steam/return`,
			realm: `${BACK_URL}`,
			apiKey: "9187CBCB3F0065FD1024DE12FFCD7345",
		},
		async (identifier: string, profile: UserType, done: any) => {
			// the user's Steam profile is returned to represent the logged-in user.
			profile.identifier = identifier;
			const user = await User.findOne({ identifier });
			if (!user) {
				const newUser = new User(profile);
				await newUser.save();
				return done(null, newUser);
			} else {
				return done(null, user);
			}
		}
	)
);
export { passport };
