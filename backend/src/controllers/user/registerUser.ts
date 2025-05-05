import { Request, Response } from "express";
import defaultTodos from "../../data/defaultTodos.json"
import { hashPassword } from "../../utils/crypto";
import { sendJWT } from "../../utils/jwt";
import { initUserModel } from "../../models/userModel";
import { createUserInDB, getUserByEmail } from "../../services/userServices";
import { initTodosModel } from "../../models/todosModel";
import { createTodoInDB } from "../../services/todosServices";

export const registerUser = async (req: Request, res: Response) => {

	const { name, email, password, rememberMe } = req.body;

	if (!name || !email || !password) {
		res.status(400).json({ error: 'Invalid Request' });
		return;
	}

	const hashedPassword = hashPassword(password);

	try {
		await initUserModel();
		const existingUser = await getUserByEmail(email);

		if (existingUser) {
			res.status(400).json({ error: 'User already exists' });
			return;
		}

		const user = await createUserInDB({
			name,
			email,
			hashedPassword
		});

		if (!user || !user.id) {
			throw Error('Internal Error');
		}

		await initTodosModel();
		await createTodoInDB(user.id, defaultTodos);

		const { id } = user;

		sendJWT({ id }, rememberMe, res);

		res.json({ id, name, todos: defaultTodos });

	} catch (error) {
		console.log(error);
		res.status(500).json({ error: 'Something went wrong' });
	}
};