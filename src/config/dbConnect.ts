import { connect } from "mongoose";

connectToDB().then(res => console.log('connected to db')).catch(err => console.log(err))

export async function connectToDB() {
	await connect(
		"mongodb+srv://vitorsaa2k:vitorsaa2k@cluster0.atce462.mongodb.net/cs2"
	);
}
