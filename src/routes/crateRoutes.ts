import { Router } from "express";
import * as crateController from '../controller/crateController'
import { case1 } from "../utils/cases/case1";

const crateRoutes = Router()

crateRoutes.get("/:id", crateController.HandleCrateGet);

crateRoutes.get("/open/:id", crateController.handleCrateOpen);


export {crateRoutes}