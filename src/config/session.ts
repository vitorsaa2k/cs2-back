import MongoStore from "connect-mongo";
import session from "express-session";

const expressSession = session({
	cookie: {
		secure: process.env.NODE_ENV ? true : false,
		maxAge: 1000 * 60 * 60 * 24, // 1 day
		sameSite: process.env.NODE_ENV ? "none" : false,
	},
	store: MongoStore.create({
		mongoUrl: process.env.MONGO_URI,
		touchAfter: 5000,
	}),
	secret: "secret",
	name: "sessionID",
	resave: false,
	saveUninitialized: false,
});

export { expressSession };
