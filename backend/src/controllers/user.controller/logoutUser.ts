import { Response } from "express";
import { AuthenticatedRequest } from "../../types/jwtTypes";

export const logoutUser = async (req: AuthenticatedRequest, res: Response) => {
	try {
		// Invalidate the token by removing it from the client
		res.clearCookie('authToken');

		res.json({ message: 'Logged out successfully' });
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: 'Something went wrong' });
	}
}