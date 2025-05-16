import { DataTypes, Model } from "sequelize";
import sequelize from "../db";
import { UserModelAttributes } from "../types/userTypes";

export class UserModel extends Model<UserModelAttributes> implements UserModelAttributes {
	declare id: number;
	declare name: string;
	declare email: string;
	declare hashedPassword: string;
}

export function initUserModel() {
	
	UserModel.init(
		{
			id: {
				type: DataTypes.INTEGER,
				autoIncrement: true,
				primaryKey: true
			},
			name: {
				type: DataTypes.STRING,
				allowNull: false
			},
			email: {
				type: DataTypes.STRING,
				allowNull: false
			},
			hashedPassword: {
				type: DataTypes.STRING,
				allowNull: false
			}
		},
		{
			sequelize,
			modelName: 'User',
			createdAt: false,
			updatedAt: false
		}
	);
	
}
