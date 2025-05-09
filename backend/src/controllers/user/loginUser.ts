import defaultTodos from "../../data/defaultTodos.json"
import { Request, Response } from "express";
import { comparePasswords } from "../../utils/crypto";
import { sendJWT } from "../../utils/jwt";
import { getUserByEmail } from "../../services/userServices";
import { getTodosFromDB } from "../../services/todosServices";
import { FetchedUserResponseBody } from "../../types/userTypes";
import { ErrorResponseBody } from "../../types/errorResponseTypes";

export const loginUser = async (req: Request, res: Response<FetchedUserResponseBody | ErrorResponseBody>) => {
	try {
		const { email, password, rememberMe } = req.body;

		if (!email || !password) {
			res.status(400).json({ error: 'Invalid Request' });
			return;
		}

		const user = await getUserByEmail(email);

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

		const todos = (await getTodosFromDB(user.id)) ?? defaultTodos;

		sendJWT({ id }, rememberMe, res);

		res.json({ user: { id, name }, todos });

	} catch (error) {
		console.log(error);
		res.status(500).json({ error: 'Something went wrong' });
	}
};