import { Roll } from "../models/RollModel";
import { Seed } from "../types/crateTypes";

export async function saveRoll(
	rollId: string,
	seed: Seed,
	generatedNumber: number,
	crateName: string,
	clientSeed: string
) {
	if (seed) {
		const { publicHash, secretSalt, serverSeed, nonce } = seed;
		const roll = new Roll({
			rollId,
			crateName,
			serverSeed,
			secretSalt,
			publicHash,
			clientSeed,
			nonce,
			roll: generatedNumber,
		});
		await roll.save();
		return roll;
	}
}
