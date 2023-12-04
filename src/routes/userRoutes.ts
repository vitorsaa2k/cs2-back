import { Router } from "express";
import { User } from "../models/UserModel";
import { bot } from "../server";

const userRoutes = Router();

userRoutes.get("/:id", async (req, res) => {
	const { id } = req.params;
	console.log({ id });
	const user = await User.findOne({ id });

	if (!user) {
		res.json({ message: "Usuario não existe", error: true });
	} else {
		res.json(user);
	}
});
userRoutes.post("/send", async (req, res) => {
	bot.sendSkinToUser(req.body.userId, "33891961321", (err, status, offerId) => {
		console.log(err, status, offerId);
	});
});

export { userRoutes };
