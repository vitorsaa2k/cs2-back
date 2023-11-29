import { User } from "../models/UserModel";
import { UserType } from "../types/userTypes";
import { createUserInventory } from "./createUserInventory";

async function createNewUser(profile: UserType) {
	const user = await User.findOne({ id: profile.id });
	if (!user) {
		const newUser = new User(profile);
		await newUser.save();
		await createUserInventory(newUser.id);
		return newUser;
	} else {
		return user;
	}
}

export { createNewUser };
