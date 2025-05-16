import { Response } from "express";
import { getTodosFromDB, updateTodosInDB } from "../repos/todos.repo";
import { ErrorResponseBody } from "../types/errorResponseTypes";
import { AuthenticatedRequest } from "../types/jwtTypes";
import { TodosListsResponse } from "../types/todosTypes";

export const fetchUserTodos = async (req: AuthenticatedRequest, res: Response<TodosListsResponse | ErrorResponseBody>) => {
	const userId = req.user?.id;

	if (!userId) {
		res.status(400).json({ error: 'Invalid Request' });
		return;
	}

	try {
		const todos = await getTodosFromDB(userId);

		if (!todos) {
			res.status(404).json({ error: 'Todos not found' });
			return;
		}

		res.json(todos);

	} catch (error) {
		console.log(error);
		res.status(500).json({ error: 'Something went wrong' });
	}
}

export const updateTodos = async (req: AuthenticatedRequest, res: Response<ErrorResponseBody>) => {
	const { todos } = req.body;

	const userId = req.user?.id;

	if (!userId || !todos) {
		res.status(400).json({ error: 'Invalid Request' });
		return;
	}

	try {
		const todo = await getTodosFromDB(userId);

		if (!todo) {
			res.status(404).json({ error: 'Todos not found' });
			return;
		}

		await updateTodosInDB(userId, todos);

		res.status(204).send();

	} catch (error) {
		console.log(error);
		res.status(500).json({ error: 'Something went wrong' });
	}
};

