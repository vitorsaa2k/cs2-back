import { Router } from "express";
import * as userController from "../controller/userController";

const userRoutes = Router();

userRoutes.get("/:id", userController.getUser);

userRoutes.get("/inventory/:id", userController.getUserInventory);

export { userRoutes };
