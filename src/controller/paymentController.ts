import axios from "axios";
import { Request, Response } from "express";
import crypto from "crypto";
const API_KEY =
	"Di378evcnoqxnb773vuMtatyVJKAdiiyqcaxjowg24pmuixvaubStgSGSTopvu028ymjkpmJABT2cxtas94jkodxazsf"; //this is a fake api key

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
			//create a new invoice on database with date created, paymentId, userId, amount, and status of the payment
		}
		res.status(200).json(invoice.data.result.url);
	} catch (error) {
		res.status(500).json(error);
	}
};

const handleCallback = async (req: Request, res: Response) => {
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

export { createCryptoInvoice, handleCallback };
