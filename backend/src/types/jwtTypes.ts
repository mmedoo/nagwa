import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";
import { UserIdType } from "./userTypes";

/**
 * Represents the payload of a JSON Web Token (JWT) with additional user-specific information.
 * 
 * @extends JwtPayload
 * 
 * @property id - The unique identifier of the user.
*/
export interface TokenPayload extends JwtPayload {
	/**
	 * The unique identifier of the user.
	*/
	id: UserIdType;
}

/**
 * Represents an authenticated HTTP request that extends the base `Request` object from Express.
 * This interface includes an optional `user` property, which contains the decoded
 * token payload of the authenticated user.
 *
 * @extends Request
 * 
 * @property user - An optional property that holds the token payload of the authenticated user.
 *                  This is typically populated after successful authentication.
*/
export interface AuthenticatedRequest extends Request {
	/**
	 * The decoded token payload of the authenticated user.
	 * This property is optional and may not be present if the user is not authenticated.
	*/
	user?: TokenPayload;
}
