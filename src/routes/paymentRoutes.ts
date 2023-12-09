import { Router } from "express";
import * as paymentController from "../controller/paymentController";
import { ensureAuthenticated } from "../middlewares/authMiddlewares";

const paymentRoutes = Router();

paymentRoutes.post("/crypto", paymentController.createCryptoInvoice);
paymentRoutes.post("/callback", paymentController.handleCryptoCallback);

paymentRoutes.post(
	"/stripe",
	ensureAuthenticated,
	paymentController.createStripeInvoice
);
paymentRoutes.post("/webhook", paymentController.handleStripeCallback);
paymentRoutes.get("/:paymentId", paymentController.checkPayment);
paymentRoutes.get("/bonus/:code", paymentController.getBonus);

export { paymentRoutes };
