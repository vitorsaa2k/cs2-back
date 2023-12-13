import { CrateType, WearType } from "../types/crateTypes";

function findSkinByRate(crate: CrateType, rate: number) {
	const Drawnskin = crate.skins.find(
		skin => skin.maxRate >= rate && skin.minRate <= rate
	);
	if (!Drawnskin)
		return {
			message: "the number drawn does not have a number equivalent to a weapon",
			error: true,
		};

	var Wear = Drawnskin.wear
		? Drawnskin.wear.find(wear => rate <= wear.wearRate)
		: { wearType: "Default-Wear", wearRate: 2 };

	if (!Wear) {
		Wear = { wearType: "Default-Wear", wearRate: 2 };
	}
	const skin = { ...Drawnskin };
	let WearArray: WearType[] = [Wear];
	delete skin.maxRate;
	delete skin.minRate;
	skin.wear = WearArray;
	return skin;
}

export { findSkinByRate };
