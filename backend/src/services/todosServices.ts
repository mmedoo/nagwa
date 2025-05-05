import { TodosModel } from "../models/todosModel";
import { TodoListType } from "../types/todosTypes";
import { UserModelAttributes } from "../types/userTypes";

export async function createTodoInDB(userId: UserModelAttributes['id'], todos: TodoListType[])
	: Promise<void> {
	if (!userId) {
		throw new Error('User ID is required');
	}
	try {
		await TodosModel.create({
			userId,
			todos: JSON.stringify(todos)
		});

	} catch (error) {
		console.error('Error creating todos in DB:', error);
		throw new Error('Failed to create todos in DB');
	}
}


export async function updateTodosInDB(userId: UserModelAttributes['id'], todos: TodoListType[])
	: Promise<void> {
	if (!userId) {
		throw new Error('User ID is required');
	}
	try {
		await TodosModel.update({
			todos: JSON.stringify(todos)
		}, { where: { userId }, });

	} catch (error) {
		console.error('Error Updating todos in DB:', error);
		throw new Error('Failed to update todos in DB');
	}
}

export async function getTodosFromDB(userId: UserModelAttributes['id']): Promise<TodoListType[] | null> {
	try {
		const todosData = await TodosModel.findOne({
			where: { userId }
		});

		if (!todosData) {
			return null;
		}

		return JSON.parse(todosData.todos);
	} catch (error) {
		console.error('Error fetching todos from DB:', error);
		throw new Error('Failed to fetch todos from DB');
	}

}
