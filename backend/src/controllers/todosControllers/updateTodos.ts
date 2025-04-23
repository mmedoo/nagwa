import { Response } from "express";
import { AuthenticatedRequest } from "../../middleware/authMiddleware";
import { Todos } from "../../models/todosModel";


export const updateTodos = async (req: AuthenticatedRequest, res: Response) => {
	const { todos } = req.body;

	const userId = req.user?.id;

	if (!userId || !todos) {
		res.status(400).json({ error: 'Invalid Request' });
		return;
	}

	try {
		const todo = await Todos.findOne({
			where: { userId }
		});

		if (!todo) {
			res.status(404).json({ error: 'Todos not found' });
			return;
		}

		await Todos.update({ todos: JSON.stringify(todos) }, {
			where: { userId }
		});

		res.status(204).send();

	} catch (error) {
		console.log(error);
		res.status(500).json({ error: 'Something went wrong' });
	}
};
