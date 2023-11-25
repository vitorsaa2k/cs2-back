import "dotenv/config";
export const FRONT_URL =
	process.env.NODE_ENV === "production"
		? "https://skinsmania.vercel.app"
		: "http://localhost:5173";
