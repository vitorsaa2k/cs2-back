import { NextFunction, Request, Response } from "express";

const ensureAuthenticated = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	if (req.isAuthenticated()) {
		next();
	} else {
		res.status(401).send("/auth/steam");
	}
};

export { ensureAuthenticated };
