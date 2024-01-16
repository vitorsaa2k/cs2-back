import { Schema, model } from "mongoose";

const paymentSchema = new Schema({
	userId: { type: String, required: true },
	paymentId: { type: String, required: true },
	amount: { type: Number, required: true },
	dateCreated: { type: String, default: new Date() },
	status: { type: String, required: true },
	finalAmount: { type: Number, required: true },
});

const Payment = model("Payment", paymentSchema);

export { Payment };
