import { Router } from "express";
import { handleOpenCreate } from "../controller/crateController";

const rollerRoutes = Router();

rollerRoutes.get("/:name", handleOpenCreate);

export { rollerRoutes };
