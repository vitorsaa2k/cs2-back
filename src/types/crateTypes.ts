export type CrateType = {
	name: string;
	limitRate: number;
	skins: SkinType[];
};
export type SkinType = {
	name: string;
	color: string;
	price: number;
	img: string;
	minRate: number;
	maxRate: number;
	wear?: WearType[];
};
export type WearType = {
	wearType: string;
	wearRate: number;
};
