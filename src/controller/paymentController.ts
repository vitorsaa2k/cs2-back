import { FRONT_URL } from "./../config/url";
import "dotenv/config";
import axios from "axios";
import { Request, Response } from "express";
import crypto from "crypto";
import Stripe from "stripe";
import { Payment } from "../models/PaymentModel";
import { User } from "../models/UserModel";
import { Bonus } from "../models/BonusModel";
const API_KEY =
	"Di378evcnoqxnb773vuMtatyVJKAdiiyqcaxjowg24pmuixvaubStgSGSTopvu028ymjkpmJABT2cxtas94jkodxazsf"; //this is a fake api key

const stripeClient = new Stripe(
	"sk_test_51MC7qmKfB6obfP5pwESZQ29wX5Zb4N0KgnHRosjtxYPk85jiEIV5rfCgfHNyjDt5wLo3U0n5lRAprXjS9zH78fdq00gOyj7LMV"
);

const endpointSecret = process.env.NODE_ENV
	? "whsec_0Eo4dKCrhUChcziufZ9hqDlat0QxEwjS"
	: "whsec_8521de186f88a27af33bfb7cc1f0daf158322cb4055b3f4227833f31427ecae2";

const createCryptoInvoice = async (req: Request, res: Response) => {
	const { amount, currency } = req.body;

	const data = {
		amount,
		currency,
		order_id: crypto.randomBytes(12).toString("hex"),
		url_callback:
			"https://3011-2804-2108-fd15-721-e121-8c3b-1585-f7f.ngrok-free.app/checkout/callback", //the url callback can't be a localhost use ngrok for testing
	};

	const sign = crypto
		.createHash("md5")
		.update(Buffer.from(JSON.stringify(data)).toString("base64") + API_KEY)
		.digest("hex");
	const headers = {
		merchant: "8b03432e-385b-4670-8d06-064591096795",
		sign,
	};
	try {
		const invoice = await axios.post(
			"https://api.cryptomus.com/v1/payment",
			data,
			{
				headers,
			}
		);
		if (invoice.data.result) {
			//create a new invoice on database with dateCreated, paymentId, userId, amount, and status of the payment
		}
		res.status(200).json(invoice.data.result.url);
	} catch (error) {
		res.status(500).json(error);
	}
};

const handleCryptoCallback = async (req: Request, res: Response) => {
	const { sign } = req.body;

	if (!sign) {
		res.status(400).json({
			error: {
				message: "Missing Sign",
			},
		});
	}

	const data = JSON.parse(req.rawBody);
	delete data.sign;

	const hash = crypto
		.createHash("md5")
		.update(Buffer.from(JSON.stringify(data)).toString("base64") + API_KEY)
		.digest("hex");

	if (sign !== hash) {
		return res.status(400).json({
			error: {
				message: "Invalid Sign",
			},
		});
	}

	if (req.body.is_final && req.body.status === "paid") {
		//updates the user balance
	}

	res.sendStatus(200);
};

const createStripeInvoice = async (req: Request, res: Response) => {
	const { amount, code } = req.body;
	const userId = req.user?.id;
	const checkout = await stripeClient.checkout.sessions.create({
		mode: "payment",
		line_items: [
			{
				quantity: 1,
				price_data: {
					currency: "USD",
					product_data: {
						name: `Add $${amount} to SkinsMania`,
					},
					unit_amount: 1 * 100 * amount,
				},
			},
		],
		success_url: `${FRONT_URL}/`,
		cancel_url: `${FRONT_URL}/?canceled=true`,
	});

	const bonus = await Bonus.findOne({ code });
	let finalAmount = 0;

	if (bonus) {
		finalAmount = bonus.percentage * amount + amount;
	} else {
		finalAmount = amount;
	}

	const payment = new Payment({
		userId,
		paymentId: checkout.id,
		amount,
		status: checkout.payment_status,
		finalAmount,
	});
	await payment.save();

	res.status(200).json(checkout);
};

const handleStripeCallback = async (req: Request, res: Response) => {
	const sig = req.headers["stripe-signature"];

	let event;

	try {
		event = stripeClient.webhooks.constructEvent(
			req.rawBody,
			sig!,
			endpointSecret
		);
	} catch (err) {
		res.status(400).send(`Webhook Error: ${err}`);
		console.log(err);
		return;
	}

	// Handle the event
	switch (event.type) {
		case "checkout.session.completed":
			const checkoutSessionCompleted = event.data.object;
			const payment = await Payment.findOneAndUpdate(
				{ paymentId: checkoutSessionCompleted.id },
				{ status: checkoutSessionCompleted.payment_status },
				{ new: true }
			);
			if (payment && payment.status === "paid") {
				const user = await User.findOne({ id: payment.userId });
				if (user && payment.finalAmount) {
					const newUserBalance = user.balance + payment.finalAmount;
					console.log(newUserBalance);
					user.balance = newUserBalance;
					await user.save();
				}
			}
			break;
		case "checkout.session.async_payment_succeeded":
			break;
		default:
			console.log(`Unhandled event type ${event.type}`);
	}

	// Return a 200 response to acknowledge receipt of the event
	res.send();
};

const checkPayment = async (req: Request, res: Response) => {
	const { paymentId } = req.params;
	const payment = await Payment.findOne({ paymentId });
	if (payment) {
		res.status(200).json(payment);
	} else {
		res.status(404).json({ error: { message: "This payment dont exists" } });
	}
};
const getBonus = async (req: Request, res: Response) => {
	const { code } = req.params;
	const bonus = await Bonus.findOne({ code });
	if (bonus) {
		res.json(bonus);
	} else {
		res.status(404).json({ error: { message: "Bonus not found" } });
	}
};

export {
	createCryptoInvoice,
	handleCryptoCallback,
	createStripeInvoice,
	handleStripeCallback,
	checkPayment,
	getBonus,
};
