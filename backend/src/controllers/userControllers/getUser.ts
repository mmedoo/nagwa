import { Response } from "express";
import { AuthenticatedRequest } from "../../middleware/authMiddleware";
import { User } from "../../models/userModel";
import { Todos } from "../../models/todosModel";
import defaultTodos from "../../data/defaultTodos.json"

export const getUser = async (req: AuthenticatedRequest, res: Response) => {
	try {
		const userId = req.user?.id;

		const user = await User.findOne({
			where: { id: userId }
		});

		if (!user) {
			res.status(404).json({ error: 'User not found' });
			return;
		}

		const todosString = (await Todos.findOne({ where: { userId } }))?.todos;
		const todos = todosString ? JSON.parse(todosString) : defaultTodos

		res.json({ id: user.id, name: user.name, todos });
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: 'Something went wrong' });
	}
}