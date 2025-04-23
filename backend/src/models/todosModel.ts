import { Sequelize, DataTypes, Model } from "sequelize";

export interface TodosAttributes {
	userId: number;
	todos: string;
}

export class Todos extends Model<TodosAttributes> implements TodosAttributes {
	public userId!: number;
	public todos!: string;
}

export default (sequelize: Sequelize) => {
	Todos.init(
		{
			userId: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: {
					model: 'Users',
					key: 'id',
				},
				onUpdate: 'CASCADE',
				onDelete: 'CASCADE',
			},
			todos: {
				type: DataTypes.STRING,
				allowNull: false
			},
		},
		{
			sequelize,
			modelName: 'Todos',
			createdAt: false,
			updatedAt: false,
		}
	);

	return Todos;
};
