import { RarityNames } from "../types/types";

export function buildSkinsQuery(
	maxPrice?: number,
	name?: string,
	rarity?: RarityNames
) {
	const match: {
		price?: { $lte: number };
		name?: { $regex: string; $options: string };
		rarity?: { $regex: string; $options: string };
	} = {};

	// only apply price filter if maxPrice is provided
	if (maxPrice) {
		match.price = { $lte: Number(maxPrice) };
	}

	// only apply name filter if name is provided
	if (name) {
		match.name = { $regex: name, $options: "i" };
	}

	// only apply rarity filter if rarity is provided
	if (rarity) {
		match.rarity = { $regex: rarity, $options: "i" };
	}
	return match;
}
