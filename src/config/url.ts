import "dotenv/config";
export const FRONT_URL = process.env.NODE_ENV
	? "https://skinsmania.vercel.app"
	: "http://localhost:5173";
