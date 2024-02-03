import { Router } from "express";
import * as userController from "../controller/userController";
import { ensureAuthenticated } from "../middlewares/authMiddlewares";

const userRoutes = Router();

userRoutes.get("/", userController.getUser);
userRoutes.get("/public/:id", userController.getUserById);

userRoutes.get("/inventory", userController.getUserInventory);
userRoutes.get("/inventory/public/:id", userController.getUserInventoryById);

userRoutes.get("/seeds", userController.getUserPublicSeeds);
userRoutes.get("/seeds/history", userController.getServerSeedHistory);

userRoutes.get("/inventory/sell/all", userController.sellAllUserSkins);
userRoutes.post("/inventory/sell", userController.sellUserSkins);

export { userRoutes };
