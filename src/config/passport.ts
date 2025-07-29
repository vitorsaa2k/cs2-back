import { Strategy } from "passport-steam";
import passport from "passport";
import GoogleStrategy from "passport-google-oauth20";
import { UserType } from "../types/userTypes";
import { BACK_URL } from "./url";
import { createNewUser } from "../helpers/createNewUser";

// Use the SteamStrategy within Passport.
//   Strategies in passport require a `validate` function, which accept
//   credentials (in this case, an OpenID identifier and profile), and invoke a
//   callback with a user object.
passport.use(
	new Strategy(
		{
			returnURL: `${BACK_URL}/auth/steam/return`,
			realm: `${BACK_URL}`,
			apiKey: process.env.STEAM_SECRET,
		},
		async (identifier: string, profile: UserType, done: any) => {
			// the user's Steam profile is returned to represent the logged-in user.
			profile.identifier = identifier;
			return done(null, await createNewUser(profile));
		}
	)
);

if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
	throw new Error("Google ClientID or ClientSecret not provided in .env file");
}
passport.use(
	new GoogleStrategy.Strategy(
		{
			clientID: process.env.GOOGLE_CLIENT_ID,
			clientSecret: `${process.env.GOOGLE_CLIENT_SECRET}`,
			callbackURL: `${BACK_URL}/auth/google/return`,
			passReqToCallback: true,
			scope: ["email", "profile"],
		},
		async (
			req,
			accessToken: string,
			refreshToken: string,
			params: GoogleStrategy.GoogleCallbackParameters,
			profile: GoogleStrategy.Profile,
			cb: GoogleStrategy.VerifyCallback
		) => {
			const parsedProfile: UserType = {
				...profile,
				balance: 0,
			};
			console.log(parsedProfile);
			return cb(null, await createNewUser(parsedProfile));
		}
	)
);
export { passport };
