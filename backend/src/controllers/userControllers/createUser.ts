import { Request, Response } from "express";
import { sendJWT } from "../../middleware/authMiddleware";
import { Todos } from "../../models/todosModel";
import { User } from "../../models/userModel";
import { hashPassword } from "../../utils";
import defaultTodos from "../../data/defaultTodos.json"

export const createUser = async (req: Request, res: Response) => {

	const { name, email, password, rememberMe } = req.body;

	if (!name || !email || !password) {
		res.status(400).json({ error: 'Invalid Request' });
		return;
	}

	const hashedPassword = hashPassword(password);

	try {
		const existingUser = await User.findOne({ where: { email } });

		if (existingUser) {
			res.status(400).json({ error: 'User already exists' });
			return;
		}

		const user = await User.create({
			name,
			email,
			hashedPassword
		});

		if (!user) {
			throw Error('Internal Error');
		}

		Todos.create({
			userId: user.id!,
			todos: JSON.stringify(defaultTodos)
		})

		const { id } = user;

		sendJWT({ id }, res, rememberMe);

		res.json({ id, name, todos: defaultTodos });

	} catch (error) {
		console.log(error);
		res.status(500).json({ error: 'Something went wrong' });
	}
};