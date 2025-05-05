import { Response } from "express";
import { AuthenticatedRequest } from "../../types/jwtTypes";
import { initUserModel } from "../../models/userModel";
import { getUserById } from "../../services/userServices";
import { initTodosModel } from "../../models/todosModel";
import { getTodosFromDB } from "../../services/todosServices";

export const fetchUser = async (req: AuthenticatedRequest, res: Response) => {
	try {
		const userId = req.user?.id;

		if (!userId) {
			res.status(400).json({ error: 'Invalid Request' });
			return;
		}
		
		await initUserModel();
		const user = await getUserById(userId);

		if (!user) {
			res.status(404).json({ error: 'User not found' });
			return;
		}

		await initTodosModel();
		const todos = await getTodosFromDB(userId);

		res.json({ id: user.id, name: user.name, todos });
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: 'Something went wrong' });
	}
}