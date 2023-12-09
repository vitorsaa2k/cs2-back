import { Router } from "express";
import * as userController from "../controller/userController";
import { ensureAuthenticated } from "../middlewares/authMiddlewares";

const userRoutes = Router();

userRoutes.get("/", userController.getUser);

userRoutes.get(
	"/inventory",
	ensureAuthenticated,
	userController.getUserInventory
);

export { userRoutes };
