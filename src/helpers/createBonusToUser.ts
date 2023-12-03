import { Bonus } from "../models/BonusModel";

async function createBonus(userId: string) {
	const bonus = new Bonus({ userId });
	await bonus.save();
}

export { createBonus };
