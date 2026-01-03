import { CrateType } from "../types/crateTypes";

function findSkinByRate(crate: CrateType, rate: number) {
	const drawnSkin = crate.skins.find(skin =>
		skin.maxRate && skin.minRate
			? skin.maxRate >= rate && skin.minRate <= rate
			: null
	);
	if (!drawnSkin) return null;
	// not handling wear yet, maybe this will not be necessary
	/* var Wear = Drawnskin.wear
		? Drawnskin.wear.find(wear => rate <= wear.wearRate)
		: { wearType: "Default-Wear", wearRate: 2 };

	if (!Wear) {
		Wear = { wearType: "Default-Wear", wearRate: 2 };
	}
	skin.wear = WearArray;
	let WearArray: WearType[] = [Wear]; */
	const skin = { ...drawnSkin };
	delete skin.maxRate;
	delete skin.minRate;
	return skin;
}

export { findSkinByRate };
