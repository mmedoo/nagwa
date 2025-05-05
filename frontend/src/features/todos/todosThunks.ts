import api from '../../app/api';
import { MappedListData, UnMappedListData } from '../../types';

export const pushTodosToBackend = async (todos: MappedListData[]) => {
	
	const unmappedTodos: UnMappedListData[] = todos.map(({ id, title, tasks }) => ({
		id,
		title,
		tasks: tasks.allIds.map((id) => tasks.byId[id]),
	}));

	try {
		await api.put('/todos', { todos: unmappedTodos });
	} catch (error) {
		throw new Error(`Failed to push todos to backend ${error}`);
	}
}