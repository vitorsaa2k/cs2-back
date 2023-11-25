import { Router } from "express";
import passport from "passport";
import { UserType } from "../types/userTypes";
import { FRONT_URL } from "../config/url";

const authRoutes = Router();

// GET /auth/steam
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  The first step in Steam authentication will involve redirecting
//   the user to steamcommunity.com.  After authenticating, Steam will redirect the
//   user back to this application at /auth/steam/return
authRoutes.get(
	"/steam",
	passport.authenticate("steam", { failureRedirect: "/" }),
	async (req, res) => {
		res.redirect("/");
	}
);

// GET /auth/steam/return
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called.
authRoutes.get(
	"/steam/return",
	passport.authenticate("steam", { failureRedirect: "/" }),
	async (req, res) => {
		if (req.user) {
			const user: UserType = req.user;
			res.redirect(`${FRONT_URL}/user/?userId=${user.id}`);
		}
	}
);

authRoutes.get("/logout", async (req, res) => {
	req.logout(err => {});
	res.redirect(`${FRONT_URL}/`);
});

export { authRoutes };
