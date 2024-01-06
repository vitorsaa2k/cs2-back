import { Router } from "express";
import * as sectionController from "../controller/sectionController";

const sectionRoutes = Router();

sectionRoutes.get("/", sectionController.getAllSections);

export { sectionRoutes };
