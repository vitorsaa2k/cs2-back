import { Section } from "../models/SectionModel";
import { Request, Response } from "express";

export const getAllSections = async (req: Request, res: Response) => {
	const section = await Section.find();

	res.status(200).json(section);
};
