import { CrateType, WearType } from "../types/crateTypes";

function findSkinByRate(crate: CrateType, rate: number) {
	const Drawnskin = crate.skins.find(
		skin => skin.maxRate >= rate && skin.minRate <= rate
	);
	if (!Drawnskin) return null;
	// not handling wear yet, maybe this will not be necessary
	/* var Wear = Drawnskin.wear
		? Drawnskin.wear.find(wear => rate <= wear.wearRate)
		: { wearType: "Default-Wear", wearRate: 2 };

	if (!Wear) {
		Wear = { wearType: "Default-Wear", wearRate: 2 };
	}
	skin.wear = WearArray;
	let WearArray: WearType[] = [Wear]; */
	const skin = { ...Drawnskin };
	delete skin.maxRate;
	delete skin.minRate;
	return skin;
}

export { findSkinByRate };
