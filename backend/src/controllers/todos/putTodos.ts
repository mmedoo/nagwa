import { Response } from "express";
import { AuthenticatedRequest } from "../../types/jwtTypes";
import { getTodosFromDB, updateTodosInDB } from "../../services/todosServices";
import { ErrorResponseBody } from "../../types/errorResponseTypes";

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
