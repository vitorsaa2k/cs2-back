import { Router } from "express";
import * as crateController from "../controller/crateController";

const crateRoutes = Router();

crateRoutes.get("/open/:name", crateController.handleCrateOpen);

crateRoutes.get("/:name", crateController.getCrateByName);

crateRoutes.post("/add", crateController.addCrateToDB);

export { crateRoutes };
