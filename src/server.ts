import express from "express";
import cors from "cors";
import { passport } from "./config/passport";
import bodyParser from "body-parser";
import session from "express-session";
import { authRoutes } from "./routes/authRoutes";
import http from "http";
import { userRoutes } from "./routes/userRoutes";
import { connectToDB } from "./config/dbConnect";
import { crateRoutes } from "./routes/crateRoutes";
import { rollerRoutes } from "./routes/rollerRoutes";
import "dotenv/config";
import { Server } from "socket.io";
const app = express();
export const server = http.createServer(app);

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

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(
	session({
		cookie: {
			secure: true,
			maxAge: 100000,
		},
		secret: "secret",
		name: "sessionID",
		resave: true,
		saveUninitialized: true,
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

app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/crate", crateRoutes);
app.use("/roll", rollerRoutes);

server.listen(3001, () => {
	console.log(`App listening on port ${3001}`);
});
