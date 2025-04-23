import { Response } from "express";
import { AuthenticatedRequest } from "../../middleware/authMiddleware";
import { Todos } from "../../models/todosModel";


export const getTodos = async (req: AuthenticatedRequest, res: Response) => {

	const userId = req.user?.id;

	if (!userId) {
		res.status(400).json({ error: 'Invalid Request' });
		return;
	}

	try {
		const todos = await Todos.findOne({
			where: { userId }
		});

		if (!todos) {
			res.status(404).json({ error: 'Todos not found' });
			return;
		}

		res.json(JSON.parse(todos.todos));

	} catch (error) {
		console.log(error);
		res.status(500).json({ error: 'Something went wrong' });
	}
};
