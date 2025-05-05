import { Response } from "express";
import { AuthenticatedRequest } from "../../types/jwtTypes";
import { getTodosFromDB } from "../../services/todosServices";

export const fetchUserTodos = async (req: AuthenticatedRequest, res: Response) => {

	const userId = req.user?.id;

	if (!userId) {
		res.status(400).json({ error: 'Invalid Request' });
		return;
	}

	try {
		// await initTodosModel();
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
};
