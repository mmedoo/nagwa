import { Sequelize, DataTypes, Model } from "sequelize";

export interface UserAttributes {
	id?: number;
	name: string;
	email: string;
	hashedPassword: string;
}

export class User extends Model<UserAttributes> implements UserAttributes {
	declare id?: number;
	declare name: string;
	declare email: string;
	declare hashedPassword: string;
}

export default (sequelize: Sequelize) => {
	User.init(
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

	return User;
};
