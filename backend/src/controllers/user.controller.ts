import { Request, Response } from "express";
import { createTodoInDB, getTodosFromDB } from "../repos/todos.repo";
import { createUserInDB, getUserByEmail, getUserById } from "../repos/user.repo";
import { ErrorResponseBody } from "../types/errorResponseTypes";
import { AuthenticatedRequest } from "../types/jwtTypes";
import { FetchedUserResponseBody } from "../types/userTypes";
import { comparePasswords, hashPassword } from "../utils/crypto";
import defaultTodos from '../data/defaultTodos.json'
import { sendJWT } from "../utils/jwt";

export const registerUser = async (req: Request, res: Response<FetchedUserResponseBody | ErrorResponseBody>) => {
	const { name, email, password, rememberMe } = req.body;

	if (!name || !email || !password) {
		res.status(400).json({ error: 'Invalid Request' });
		return;
	}

	const hashedPassword = hashPassword(password);

	try {
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

		await createTodoInDB(user.id, defaultTodos);

		const { id } = user;

		sendJWT({ id }, rememberMe, res);

		res.json({ user: { id, name }, todos: defaultTodos });
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: 'Something went wrong' });
	}
};

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
}


export const fetchUser = async (req: AuthenticatedRequest, res: Response<FetchedUserResponseBody | ErrorResponseBody>) => {
	try {
		const userId = req.user?.id;
		if (!userId) {
			res.status(400).json({ error: 'Invalid Request' });
			return;
		}

		const user = await getUserById(userId);
		if (!user) {
			res.status(404).json({ error: 'User not found' });
			return;
		}

		const todos = await getTodosFromDB(userId);
		if (!todos) {
			res.status(404).json({ error: 'Todos not found' });
			return;
		}

		const { id, name } = user;
		res.json({ user: { id, name }, todos });
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: 'Something went wrong' });
	}
};

export const logoutUser = async (_req: AuthenticatedRequest, res: Response) => {
	try {
		// Invalidate the token by removing it from the client
		res.clearCookie('authToken');

		res.json({ message: 'Logged out successfully' });
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: 'Something went wrong' });
	}
};
