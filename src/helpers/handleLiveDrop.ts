import { DrawnSkin, LiveDropItem } from "../types/crateTypes";
import io from "../config/socket";
import { User } from "../models/UserModel";

let recentItems: LiveDropItem[] = [];
let bestSkins: DrawnSkin[] = [];

async function handleLiveDrop(skinList: DrawnSkin[], userId: string) {
	const user = await User.findOne({ id: userId });
	if (user) {
		const itemsToAdd: LiveDropItem[] = skinList.map(skin => ({
			...skin,
			userId,
			userIcon: user.photos[2].value,
			userDisplayName: user.displayName,
		}));
		recentItems.unshift(...itemsToAdd);
		recentItems.splice(20, recentItems.length);
		const newBestSkins = skinList.filter(
			skin =>
				skin.color == "Red" || skin.color == "Yellow" || skin.color == "Pink"
		);
		bestSkins.unshift(...newBestSkins);
		io().emit("updateLiveDrop", {
			skinList: itemsToAdd,
			bestSkins: newBestSkins.reverse(),
		});
	}
}

export { handleLiveDrop, recentItems, bestSkins };
