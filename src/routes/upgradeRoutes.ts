import { Router } from "express";
import * as upgradeController from "../controller/upgradeController";

const upgradeRoutes = Router();

//upgradeRoutes.post("/", upgradeController.upgrade);

upgradeRoutes.post("/chance", upgradeController.getChance);

export { upgradeRoutes };
