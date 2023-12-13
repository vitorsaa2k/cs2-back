import { CrateType } from "../types/crateTypes";
import { findSkinByRate } from "./findSkinByRate";
import { generateSeed } from "./provablyFair";

export function simulateDraw(crate: CrateType) {
	const rollId = generateSeed(8);
	const randomNumber = Math.floor(Math.random() * 1000000);
	const skin = findSkinByRate(crate, randomNumber);
	return { ...skin, rollId };
}
