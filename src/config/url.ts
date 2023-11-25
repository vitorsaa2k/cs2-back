import "dotenv/config";
export const FRONT_URL =
	process.env.NODE_ENV === "production"
		? "https://skinsmania.vercel.app"
		: "http://localhost:5173";

export const BACK_URL =
	process.env.NODE_ENV === "production"
		? "https://skinsmania.onrender.com"
		: "http://localhost:3001";
