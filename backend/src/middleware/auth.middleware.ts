import { Response, NextFunction } from 'express';
import { AuthenticatedRequest, TokenPayload } from '../types/jwtTypes';
import { verifyJWT } from '../utils/jwt';

export const authenticateToken = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
	const token = req.cookies.authToken;

	if (!token) {
		res.status(401).json({ error: 'Unauthorized' });
		return;
	}

	try {
		const decoded = verifyJWT(token);
		req.user = decoded as TokenPayload;
		next();
	} catch (error) {
		res.status(403).json({ error: 'Invalid or expired token' });
	}
};