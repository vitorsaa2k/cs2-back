import { Schema, model } from "mongoose";

const sectionSchema = new Schema({
	sectionId: { type: String, required: true },
	name: { type: String, required: true },
	layoutVariant: String,
	crates: {
		type: [
			{
				name: { type: String, required: true },
				crateId: { type: String, required: true },
				price: { type: Number, required: true },
				isActive: { type: Boolean, required: true },
				img: { type: String, required: true },
				isNew: { type: Boolean, required: true },
			},
		],
		default: [],
	},
});

const Section = model("Section", sectionSchema);

export { Section };
