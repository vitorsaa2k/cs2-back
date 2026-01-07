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

export { crateRoutes };
