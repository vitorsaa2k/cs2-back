import { Router } from "express";
import * as crateController from "../controller/crateController";
import { ensureAuthenticated } from "../middlewares/authMiddlewares";

const crateRoutes = Router();

crateRoutes.post(
	"/open/:name",
	ensureAuthenticated,
	crateController.handleCrateOpen
);

crateRoutes.get("/:name", crateController.getCrateByName);

crateRoutes.post("/add", crateController.addCrateToDB);

crateRoutes.post("/simulate", crateController.simulateCrateOpening);

export { crateRoutes };
