import express from 'express'
import cors from 'cors'
import {passport} from './config/passport'
import bodyParser from 'body-parser'
import session from 'express-session'
import { authRoutes } from './routes/authRoutes'
import { userRoutes } from './routes/userRoutes'
import { connectToDB } from './config/dbConnect'
import { io } from './config/socket'
import { casesRoutes } from './routes/casesRoutes'
import { rollerRoutes } from './routes/rollerRoutes'
import 'dotenv/config'

io.listen(3004)

connectToDB()

const app = express()

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
})

passport.deserializeUser(function (obj, done) {
	done(null, obj);
});

app.use('/auth', authRoutes)
app.use('/user', userRoutes)
app.use('/case', casesRoutes)
app.use('/roll', rollerRoutes)


app.listen(3001, async () => {
	console.log(`App listening on port ${3001}`);
});