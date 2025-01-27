import express from "express";
import cors from "cors";
import { passport } from "./config/passport";
import { authRoutes } from "./routes/authRoutes";
import http from "http";
import { userRoutes } from "./routes/userRoutes";
import { connectToDB } from "./config/dbConnect";
import { crateRoutes } from "./routes/crateRoutes";
import "dotenv/config";
import { FRONT_URL } from "./config/url";
import { skinRoutes } from "./routes/skinRoutes";
import { paymentRoutes } from "./routes/paymentRoutes";
import { rawBodySaver } from "./middlewares/rawBodyVerifier";
import cookieParser from "cookie-parser";
import io from "./config/socket";
import { expressSession } from "./config/session";
import { sectionRoutes } from "./routes/sectionRoutes";
import cache from "./config/lruCache";
import { upgradeRoutes } from "./routes/upgradeRoutes";
connectToDB();
const app = express();
const server = http.createServer(app);
//initialize socketIo
io(server);
//initalize cache handler
cache();

app.enable("trust proxy");
app.set("trust proxy", 1);

app.use(
	cors({
		origin: FRONT_URL,
		credentials: true,
	})
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ verify: rawBodySaver }));
app.use(cookieParser());

app.use(expressSession);

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
	done(null, user);
});

passport.deserializeUser((obj: Express.User | undefined | null, done) => {
	done(null, obj);
});

app.use("/sections", sectionRoutes);
app.use("/skin", skinRoutes);
app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/crate", crateRoutes);
app.use("/checkout", paymentRoutes);
app.use("/upgrade", upgradeRoutes);

server.listen(3001, () => {
	console.log(`App listening on port ${3001}`);
});
