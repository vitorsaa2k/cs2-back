import { Router } from "express";
import passport from "passport";
import { UserType } from "../types/userTypes";
import { FRONT_URL } from "../config/url";

const authRoutes = Router();

authRoutes.get(
	"/steam",
	passport.authenticate("steam", { failureRedirect: "/" }),
	async (req, res) => {
		res.redirect("/");
	}
);

authRoutes.get(
	"/steam/return",
	passport.authenticate("steam", { failureRedirect: "/" }),
	async (req, res) => {
		if (req.user) {
			res.redirect(`${FRONT_URL}/`);
		}
	}
);

authRoutes.get("/logout", async (req, res) => {
	req.logout(() => {});
	res.redirect(`${FRONT_URL}/`);
});

authRoutes.get(
	"/google",
	passport.authenticate("google", { failureRedirect: "/" }),
	async (req, res) => {
		res.redirect("/");
	}
);

authRoutes.get(
	"/google/return",
	passport.authenticate("google", { failureRedirect: "/" }),
	async (req, res) => {
		if (req.user) {
			res.redirect(`${FRONT_URL}/`);
		}
	}
);

authRoutes.get("/logout", async (req, res) => {
	req.logout(() => {});
	res.redirect(`${FRONT_URL}/`);
});

export { authRoutes };
