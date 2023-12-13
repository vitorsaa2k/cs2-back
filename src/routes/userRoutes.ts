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

userRoutes.get("/seeds", userController.getUserPublicSeeds);
userRoutes.get("/seeds/history", userController.getServerSeedHistory);

export { userRoutes };
