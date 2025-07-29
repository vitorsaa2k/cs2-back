import { Strategy } from "passport-steam";
import passport from "passport";
import { UserType } from "../types/userTypes";
import { BACK_URL } from "./url";
import { createNewUser } from "../helpers/createNewUser";

// Use the SteamStrategy within Passport.
//   Strategies in passport require a `validate` function, which accept
//   credentials (in this case, an OpenID identifier and profile), and invoke a
//   callback with a user object.
if (!process.env.STEAM_SECRET) {
	throw new Error("");
}
passport.use(
	new Strategy(
		{
			returnURL: `${BACK_URL}/auth/steam/return`,
			realm: `${BACK_URL}`,
			apiKey: process.env.STEAM_SECRET,
		},
		async (identifier: string, profile, done: any) => {
			// the user's Steam profile is returned to represent the logged-in user.
			const parsedUser: UserType = {
				...profile,
				emails: [],
				balance: 0,
			};
			return done(null, await createNewUser(parsedUser));
		}
	)
);
export { passport };
