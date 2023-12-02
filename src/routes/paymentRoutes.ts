import { Router } from "express";
import * as paymentController from "../controller/paymentController";

const paymentRoutes = Router();

paymentRoutes.post("/crypto", paymentController.createCryptoInvoice);
paymentRoutes.post("/callback", paymentController.handleCallback);

export { paymentRoutes };
