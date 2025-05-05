import { UserModelAttributes } from "../types/userTypes";
import { UserModel } from "../models/userModel";

export async function getUserByEmail(email: string): Promise<UserModelAttributes | null> {
	const user = await UserModel.findOne({
		where: { email }
	});
	if (!user) {
		return null;
	}
	return user;
}

export async function getUserById(id: UserModelAttributes['id']): Promise<UserModelAttributes | null> {
	const user = await UserModel.findOne({
		where: { id }
	});
	if (!user) {
		return null;
	}
	return user;
}

export async function createUserInDB({ name, email, hashedPassword }: UserModelAttributes): Promise<UserModelAttributes | null> {
	const user = await UserModel.create({
		name,
		email,
		hashedPassword
	});
	if (!user) {
		return null;
	}
	return user;
}
