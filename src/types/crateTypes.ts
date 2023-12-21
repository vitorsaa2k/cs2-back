export type CrateType = {
	name: string;
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
	name?: string | null;
	marketable?: number | null;
	tradable?: number | null;
	classid?: string | null;
	icon_url?: string | null;
	icon_url_large?: string | null;
	type?: string | null;
	weapon_type?: string | null;
	gun_type?: string | null;
	exterior?: string | null;
	rarity?: string | null;
	rarity_color?: string | null;
	price?: number | null;
};

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
