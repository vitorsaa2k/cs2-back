import { Router } from "express";
import * as crateController from "../controller/crateController";
import { ensureAuthenticated } from "../middlewares/authMiddlewares";

const crateRoutes = Router();

crateRoutes.post(
	"/open/:crateId",
	ensureAuthenticated,
	crateController.handleCrateOpen
);

crateRoutes.get("/:crateId", crateController.getCrateById);

crateRoutes.get("/roll/:rollId", crateController.getRollById);

crateRoutes.post("/add", crateController.addCrateToDB);

crateRoutes.post("/simulate", crateController.simulateCrateOpening);

export { crateRoutes };
