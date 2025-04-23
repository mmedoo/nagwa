import api from '../../app/api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ListData } from '../../types';

export const fetchTodos = createAsyncThunk<ListData[]>(
	'todos/fetchTodos',
	async () => {
		const response = await api.get('/todos');
		return response.data as ListData[];
	}
);

export const pushTodosToBackend = async (todos: ListData[]) => {
	await api.put('/todos', { todos });
}
