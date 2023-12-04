import { Schema, model } from "mongoose";

const paymentSchema = new Schema({
	userId: String,
	paymentId: String,
	amount: Number,
	dateCreated: { type: String, default: new Date() },
	status: String,
	finalAmount: Number,
});

const Payment = model("Payment", paymentSchema);

export { Payment };
