export type CrateType = {
	name: string;
	limitRate: number;
	price: number;
	skins: SkinType[];
};
export type SkinType = {
	name?: string | null;
	rarity_color?: string | null;
	price?: number | null;
	icon_url?: string | null;
	classid?: string | null;
	color: string;
	gun_type?: string | null;
	exterior?: string | null;
	minRate?: number;
	maxRate?: number;
	wear?: WearType[];
};

export type DrawnSkin = {
	rollId: string;
	name?: string | null;
	rarity_color?: string | null;
	price?: number | null;
	icon_url?: string | null;
	classid?: string | null;
	gun_type?: string | null;
	exterior?: string | null;
	wear?: WearType[];
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
