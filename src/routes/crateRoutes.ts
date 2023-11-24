import { Router } from "express";
import * as crateController from '../controller/crateController'
import { case1 } from "../utils/cases/case1";

const crateRoutes = Router()

crateRoutes.get("/open/:id", crateController.handleCrateOpen);

crateRoutes.get("/:name", crateController.getCrateByName);

crateRoutes.post("/add", crateController.addCrateToDB);


export {crateRoutes}

