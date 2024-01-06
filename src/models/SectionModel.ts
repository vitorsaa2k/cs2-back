import { Schema, model } from "mongoose";

const sectionSchema = new Schema({
	name: String,
	layoutVariant: String,
	crates: { type: Array, default: [] },
});

const Section = model("Section", sectionSchema);

export { Section };
