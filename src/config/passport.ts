import { ParamsDictionary } from "./../../node_modules/@types/express-serve-static-core/index.d";
import { Strategy } from "passport-steam";
import passport from "passport";
import GoogleStrategy from "passport-google-oauth20";
import { UserType } from "../types/userTypes";
import { BACK_URL } from "./url";
import { createNewUser } from "../helpers/createNewUser";
import { Request } from "express";
import { ParsedQs } from "../../node_modules/@types/qs/index";

if (!process.env.STEAM_SECRET) {
	throw new Error("Steam secret was not defined in the .env file");
}
passport.use(
	new Strategy(
		{
			returnURL: `${BACK_URL}/auth/steam/return`,
			realm: `${BACK_URL}`,
			apiKey: process.env.STEAM_SECRET,
		},
		async (identifier: string, profile, done: any) => {
			const parsedUser: UserType = {
				...profile,
				photo: profile.photos[profile.photos.length - 1].value,
				emails: [],
				balance: 0,
			};
			return done(null, await createNewUser(parsedUser));
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
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
			callbackURL: `${BACK_URL}/auth/google/return`,
			passReqToCallback: true,
			scope: ["email", "profile"],
		},
		async (
			req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
			accessToken: string,
			refreshToken: string,
			params: GoogleStrategy.GoogleCallbackParameters,
			profile: GoogleStrategy.Profile,
			cb: GoogleStrategy.VerifyCallback
		) => {
			const userPhoto = profile.photos
				? profile.photos[profile.photos.length - 1].value
				: "";

			const parsedProfile: UserType = {
				...profile,
				emails: profile.emails ?? [],
				photo: userPhoto,
				balance: 0,
			};
			return cb(null, await createNewUser(parsedProfile));
		}
	)
);
export { passport };
