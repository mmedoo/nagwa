import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { jwt_secret } from '../data/jwt.json' // This should be in a .env file. Hardcoded for review

const LONG_LIVED_TOKEN_EXPIRY = '7d';
const maxAge = 7 * 24 * 60 * 60 * 1000; // 7 days

interface TokenPayload extends JwtPayload {
	id: string | number;
}

export interface AuthenticatedRequest extends Request {
	user?: TokenPayload;
}

export const sendJWT = (user: string | Buffer | object, res: Response, rememberMe: boolean) => {

	const token = jwt.sign(
		user,
		jwt_secret,
		rememberMe ?
			{ expiresIn: LONG_LIVED_TOKEN_EXPIRY, }
			: undefined // This makes it session cookie
	);

	// Send Cookie
	res.cookie('authToken', token, {
		httpOnly: true,
		secure: process.env.NODE_ENV === 'production',
		maxAge: rememberMe ? maxAge : undefined, // undefined also makes it session
	});
}

export const authenticateToken = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
	const token = req.cookies.authToken;

	if (!token) {
		res.status(401).json({ error: 'Unauthorized' });
		return;
	}

	try {
		const decoded = jwt.verify(token, jwt_secret);
		req.user = decoded as TokenPayload;
		next();
	} catch (error) {
		res.status(403).json({ error: 'Invalid or expired token' });
	}
};