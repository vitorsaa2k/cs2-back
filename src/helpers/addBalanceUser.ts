import { User } from "../models/UserModel";

async function addBalanceUser(userId: string, totalToAdd: number) {
	const user = await User.findOne({ id: userId });
	if (user) {
		user.balance += totalToAdd;
		user.balance = Number(user.balance.toFixed(2));
		await user.save();
		return user;
	} else {
		return "user not found";
	}
}
export { addBalanceUser };
