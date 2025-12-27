export type CrateType = {
	name: string;
	isActive?: boolean;
	limitRate: number;
	price: number;
	skins: CrateSkin[];
};

export type CrateSkin = SkinType & {
	minRate?: number;
	maxRate?: number;
	color?: "Yellow" | "Red" | "Pink" | "Purple" | "Blue";
};

export type DrawnSkin = CrateSkin & {
	rollId: string;
};

export type LiveDropItem = DrawnSkin & {
	rollId: string;
	userId: string;
	userIcon?: string | null;
	userDisplayName?: string | null;
};

export type SkinType = {
	name: string;
	image: string;
	wear: { name: Wear };
	rarity: {
		id: string;
		name: RarityNames;
		color: string;
	};
	weapon: {
		name: string;
		weapon_id: number;
	};
	category: {
		id: string;
		name: string;
	};
	pattern: {
		id: string;
		name: string;
	};
	market_hash_name: string;
	stattrak: boolean;
	price: number;
};

export type RarityNames =
	| "Consumer Grade"
	| "Industrial Grade"
	| "Mil-Spec Grade"
	| "Restricted"
	| "Classified"
	| "Covert"
	| "Extraordinary";

export type Wear =
	| "Factory New"
	| "Minimal Wear"
	| "Field-Tested"
	| "Well-Worn"
	| "Battle-Scarred";

export type WearType = {
	wearType: string;
	wearRate: number;
};

export type RootSeed = {
	userId?: string | null;
	clientSeed?: string | null;
	seeds: Seed[];
};

export type Seed = {
	serverSeed?: string | null;
	secretSalt?: string | null;
	publicHash?: string | null;
	nonce: number;
	dateRange?: string | null;
};

export type RollSeed = {
	rollId?: string | null;
	crateName?: string | null;
	clientSeed?: string | null;
	serverSeed?: string | null;
	secretSalt?: string | null;
	publicHash?: string | null;
	nonce?: number | null;
	roll?: number | null;
};
