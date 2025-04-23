import { sendJWT } from "../../middleware/authMiddleware";
import { Todos } from "../../models/todosModel";
import { User } from "../../models/userModel";
import { comparePasswords } from "../../utils";
import defaultTodos from "../../data/defaultTodos.json"
import { Request, Response } from "express";

export const loginUser = async (req: Request, res: Response) => {
	try {
		const { email, password, rememberMe } = req.body;

		if (!email || !password) {
			res.status(400).json({ error: 'Invalid Request' });
			return;
		}

		const user = await User.findOne({
			where: { email }
		});

		if (!user) {
			res.status(404).json({ error: 'User not found' });
			return;
		}

		const isPasswordMatch = comparePasswords(password, user.hashedPassword);

		if (!isPasswordMatch) {
			res.status(401).json({ error: 'Invalid credentials' });
			return;
		}

		const { id, name } = user;

		const todosString = (await Todos.findOne({ where: { userId: id } }))?.todos;
		const todos = todosString ? JSON.parse(todosString) : defaultTodos

		sendJWT({ id }, res, rememberMe);

		res.json({ id, name, todos });

	} catch (error) {
		console.log(error);
		res.status(500).json({ error: 'Something went wrong' });
	}
};