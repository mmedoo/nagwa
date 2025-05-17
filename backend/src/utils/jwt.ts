import jwt from 'jsonwebtoken';
import { Response } from 'express';
import { TokenPayload } from '../types/jwtTypes';
import dotenv from 'dotenv';
dotenv.config();

const LONG_LIVED_TOKEN_EXPIRY = '7d';
const maxAge = 7 * 24 * 60 * 60 * 1000; // 7 days

const jwt_secret = process.env.JWT_SECRET || "61c0fa6abc84af009632cb690815f04586781a8e1c2780ddc44d6ccfae68f83605ec5260e24bad5f032040188a0834b81e596c59eedc8d67362fd436d5d85c186c7f335055feb73ba9539b743982edee4b891d72f1866387f73eb42275912285f4fbd2fecd81f00885d590602fe1c6e10b3c6664e4f72f0b3b5ed4e6f336473c68efba03d262cc2e726be1c6192bae742ae63a0490f28b35992103ea13f4ce0d2413bd35f246037740bd89a7d5762a54ec80a5cf0a29337c4078c616ceaf89e5b8916f9dbdd3369be58b48ad56d7ebe82dd3eaa61082be7eed0263b23f6ef2a1701e7e49b8f0a8b138b9726030c8a7a508c3709c8d9cc341b17a0f5e227ce6a4"

/**
 * Sends a JWT token as a cookie.
 * @param payload - The user payload to encode in the token.
 * @param rememberMe - Whether the token should be long-lived.
 * @param res - The Express response object.
 */
export const sendJWT = (
	payload: string | Buffer | object,
	rememberMe: boolean,
	res: Response
): void => {

	const token = jwt.sign(
		payload,
		jwt_secret,
		rememberMe ?
			{ expiresIn: LONG_LIVED_TOKEN_EXPIRY, }
			: undefined // This makes it session cookie
	);

	// Send Cookie
	res.cookie('authToken', token, {
		httpOnly: true,
		secure: process.env.NODE_ENV === 'production',
		maxAge: rememberMe ? maxAge : undefined, // this also makes it a session
	});
}

/**
 * Verifies a JWT token.
 * @param token - The token to verify.
 * @returns The decoded payload.
 * @throws Error if the token is invalid or expired.
 */
export const verifyJWT = (token: string): TokenPayload => {
	try {
		const decoded = jwt.verify(token, jwt_secret) as TokenPayload;
		return decoded;
	} catch (error) {
		if (error instanceof jwt.TokenExpiredError)
			throw new Error('Token expired');
		if (error instanceof jwt.JsonWebTokenError)
			throw new Error('Invalid token');
		throw new Error('Token verification failed');
	}
};