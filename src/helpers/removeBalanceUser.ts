import { User } from "../models/UserModel";

async function removeBalanceUser(totalToRemove: number, userId: string) {
	const user = await User.findOne({ id: userId });
	if (user) {
		if (user.balance < totalToRemove) return null;
		user.balance -= totalToRemove;
		user.balance = Number(user.balance.toFixed(2));
		await user.save();
		return user;
	} else {
		return "user not found";
	}
}
export { removeBalanceUser };
