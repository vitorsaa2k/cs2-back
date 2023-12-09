import express from "express";
import cors from "cors";
import MongoStore from "connect-mongo";
import { passport } from "./config/passport";
import session from "express-session";
import { authRoutes } from "./routes/authRoutes";
import http from "http";
import { userRoutes } from "./routes/userRoutes";
import { connectToDB } from "./config/dbConnect";
import { crateRoutes } from "./routes/crateRoutes";
import "dotenv/config";
import { Server } from "socket.io";
import { FRONT_URL } from "./config/url";
import { skinRoutes } from "./routes/skinRoutes";
import { paymentRoutes } from "./routes/paymentRoutes";
import { rawBodySaver } from "./middlewares/rawBodyVerifier";
import cookieParser from "cookie-parser";
const app = express();
export const server = http.createServer(app);
app.enable("trust proxy");
app.set("trust proxy", 1);
const io = new Server(server, {
	cors: {
		origin: ["http://localhost:5173", "https://skinsmania.vercel.app"],
	},
});

let totalUsers = 0;

io.on("connection", socket => {
	totalUsers++;
	io.emit("usercount", totalUsers);
	socket.on("disconnect", () => {
		totalUsers--;
		io.emit("usercount", totalUsers);
	});
});

connectToDB();

app.use(
	cors({
		origin: FRONT_URL,
		credentials: true,
	})
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ verify: rawBodySaver }));
app.use(cookieParser());

app.use(
	session({
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
	})
);

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (user, done) {
	done(null, user);
});

passport.deserializeUser(function (obj, done) {
	done(null, obj);
});

app.use("/skin", skinRoutes);
app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/crate", crateRoutes);
app.use("/checkout", paymentRoutes);

server.listen(3001, () => {
	console.log(`App listening on port ${3001}`);
});
