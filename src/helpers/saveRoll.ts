import { Roll } from "../models/RollModel";
import { Seed } from "../types/crateTypes";

export async function saveRoll(
	rollId: string,
	seed: Seed,
	generatedNumber: number,
	crateName: string,
	clientSeed: string,
	type: 'crate' | 'upgrade' = 'crate'
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
			dateRange: new Date(),
			type,
		});
		await roll.save();
		return roll;
	}
}
