export type CrateType = {
	name: string;
	limitRate: number;
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
export type WearType = {
	wearType: string;
	wearRate: number;
};
