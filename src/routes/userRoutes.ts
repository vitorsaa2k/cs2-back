import { Router } from "express";
import { User } from "../models/UserModel";

const userRoutes = Router()

userRoutes.get("/:id", async (req, res) => {
	const {id} = req.params
	console.log({id})
	const user = await User.findOne({id})

	if(!user) {
		res.json({message: 'Usuario não existe', error: true})
	} else {
		res.json(user);
	}
});


export {userRoutes}
