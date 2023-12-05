import { Router } from "express";
import * as skinController from "../controller/skinController";

const skinRoutes = Router();

skinRoutes.delete("/deleteAll", skinController.removeAllSkins);

skinRoutes.post("/add/skin", skinController.addSkin);

skinRoutes.get("/:name", skinController.getSkinByName);

export { skinRoutes };
