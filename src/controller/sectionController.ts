import { Crate } from "../models/CrateModel";
import { Section } from "../models/SectionModel";
import { Request, Response } from "express";
import { cache } from "../server";

export const getAllSections = async (req: Request, res: Response) => {
	const cachedSections = cache.get("sections");
	if (!cachedSections) {
		const sections = await Section.find();
		const sectionsToCache = await Promise.all(
			sections.map(async section => ({
				sectionId: section.sectionId,
				name: section.name,
				layoutVariant: section.layoutVariant,
				crates: await Promise.all(
					section.crates.map(
						async crate => await Crate.findOne({ crateId: crate.crateId })
					)
				),
			}))
		);
		cache.set("sections", sectionsToCache, { ttl: 1000 * 60 });
		return res.status(200).json(sectionsToCache);
	}
	return res.status(200).json(cachedSections);
};
