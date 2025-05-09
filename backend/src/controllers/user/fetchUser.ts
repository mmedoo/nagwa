import { Response } from "express";
import { AuthenticatedRequest } from "../../types/jwtTypes";
import { getUserById } from "../../services/userServices";
import { getTodosFromDB } from "../../services/todosServices";
import { FetchedUserResponseBody } from "../../types/userTypes";
import { ErrorResponseBody } from "../../types/errorResponseTypes";

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

		res.json({
			user: {
				id: user.id,
				name: user.name
			},
			todos
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: 'Something went wrong' });
	}
}