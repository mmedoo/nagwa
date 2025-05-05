import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";
import { UserModelAttributes } from "./userTypes";

export interface TokenPayload extends JwtPayload {
	id: UserModelAttributes['id'];
}

export interface AuthenticatedRequest extends Request {
	user?: TokenPayload;
}
