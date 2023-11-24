import { Router } from "express";
import { addCaseToDB, getCrateByName } from "../controller/crateController";

const crateRoutes = Router();

crateRoutes.get("/:name", getCrateByName);

crateRoutes.post("/add", addCaseToDB);

export { crateRoutes };
