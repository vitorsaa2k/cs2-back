import { Roll } from "../models/RollModel";
import { RootSeed } from "../types/crateTypes";

export async function saveRoll(
	rollId: string,
	rootSeed: RootSeed,
	generatedNumber: number,
	crateName: string
) {
	const { clientSeed, seeds } = rootSeed;
	if (seeds) {
		const { publicHash, secretSalt, serverSeed, nonce } =
			seeds[seeds.length - 1];
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
