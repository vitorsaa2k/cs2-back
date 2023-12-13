import crypto from "crypto";

const MAX_RANGE = 1000000;

function generateSeed(length: number) {
	return crypto.randomBytes(length).toString("hex");
}

function returnPublicHash(serverSeed: string, salt: string) {
	return crypto.createHmac("sha256", serverSeed).update(salt).digest("hex");
}

function combineAndHash(serverSeed: string, clientSeed: string, nonce: number) {
	return crypto
		.createHmac("sha512", serverSeed)
		.update(`${clientSeed}-${nonce}`)
		.digest("hex")
		.substring(0, 10);
}

function generateRandomNumber(hashedResult: string) {
	const decimalValue = parseInt(hashedResult, 16);
	const randomNumber = (decimalValue % MAX_RANGE) + 1;
	return randomNumber;
}

export { generateSeed, returnPublicHash, combineAndHash, generateRandomNumber };
