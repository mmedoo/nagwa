import { DataTypes, Model } from "sequelize";
import sequelize from "../db";
import { TodosModelAttributes } from "../types/todosTypes";

export class TodosModel extends Model<TodosModelAttributes> implements TodosModelAttributes {
	public userId!: number;
	public todos!: string;
}

export function initTodosModel() {
	TodosModel.init(
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

};
