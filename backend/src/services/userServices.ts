import { UserIdType, UserModelAttributes } from "../types/userTypes";
import { UserModel } from "../models/userModel";

export async function getUserByEmail(email: string): Promise<Required<UserModelAttributes> | null> {
	try {
		const user = await UserModel.findOne({
			where: { email }
		});
		if (!user) {
			return null;
		}
		return user;
		
	} catch (error) {
		console.error("Error fetching user by email:", error);
		return null;
	}
}

export async function getUserById(id: UserIdType): Promise<Required<UserModelAttributes> | null> {
	try {
		const user = await UserModel.findOne({
			where: { id }
		});
		if (!user) {
			return null;
		}
		return user;
		
	} catch (error) {
		console.error("Error fetching user by ID:", error);
		return null;
	}
}

export async function createUserInDB({ name, email, hashedPassword }: UserModelAttributes): Promise<Required<UserModelAttributes> | null> {
	try {
		const user = await UserModel.create({
			name,
			email,
			hashedPassword
		});
		if (!user) {
			return null;
		}
		return user;
		
	} catch (error) {
		console.error("Error creating user in DB:", error);
		return null;
	}
}
