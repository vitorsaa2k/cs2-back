import { Router } from "express";
import * as paymentController from "../controller/paymentController";

const paymentRoutes = Router();

paymentRoutes.post("/crypto", paymentController.createCryptoInvoice);
paymentRoutes.post("/callback", paymentController.handleCryptoCallback);

paymentRoutes.post("/stripe", paymentController.createStripeInvoice);
paymentRoutes.post("/webhook", paymentController.handleStripeCallback);
paymentRoutes.get("/:paymentId", paymentController.checkPayment);

export { paymentRoutes };
