import { TodosModel } from "../models/todos.model";
import { TodoListType } from "../types/todosTypes";
import { UserIdType } from "../types/userTypes";

export async function createTodoInDB(userId: UserIdType, todos: TodoListType[])
	: Promise<void> {
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


export async function updateTodosInDB(userId: UserIdType, todos: TodoListType[])
	: Promise<void> {
	try {
		await TodosModel.update({
			todos: JSON.stringify(todos)
		}, { where: { userId }, });

	} catch (error) {
		console.error('Error Updating todos in DB:', error);
		throw new Error('Failed to update todos in DB');
	}
}

export async function getTodosFromDB(userId: UserIdType): Promise<TodoListType[] | null> {
	try {
		const row = await TodosModel.findOne({
			where: { userId }
		});

		if (!row) {
			return null;
		}

		return JSON.parse(row.todos);
	} catch (error) {
		console.error('Error fetching todos from DB:', error);
		throw new Error('Failed to fetch todos from DB');
	}

}
