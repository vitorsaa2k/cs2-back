import { connect } from "mongoose";
import 'dotenv/config'

connectToDB().then(res => console.log('connected to db')).catch(err => console.log(err))

export async function connectToDB() {
	await connect(
		process.env.MONGO_URI!
	);
}
