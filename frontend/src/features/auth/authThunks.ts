import { createAsyncThunk } from '@reduxjs/toolkit';
import api from "../../app/api"
import { ListData, User } from '../../types';
import { store } from '../../app/store';

interface FetchCurrentUserResponse extends User {
	todos: ListData[]
}

const syncTodosState = (todos: ListData[]) => {	
	store.dispatch({
		type: 'todos/fetchTodos/fulfilled',
		payload: todos
	});
}

export const logout = createAsyncThunk(
	'auth/logout',
	async (_, thunkAPI) => {
		try {
			await api.get('/logout');
		} catch (err: any) {
			return thunkAPI.rejectWithValue(err.response?.data?.message || 'Logout failed');
		}
	}
);

export const login = createAsyncThunk(
	'auth/login',
	async (payload: { email: string, password: string, rememberMe: boolean }, thunkAPI) => {
		try {
			const response = await api.post('/user/login', payload);

			const { todos, id, name } = response.data as FetchCurrentUserResponse;
			
			syncTodosState(todos);

			return { id, name } as User;
			
		} catch (err: any) {
			return thunkAPI.rejectWithValue(err.response?.data?.message || 'Login failed');
		}
	}
);

export const register = createAsyncThunk(
	'auth/register',
	async (payload: { email: string; password: string, name: string, rememberMe: boolean }, thunkAPI) => {
		try {
			const response = await api.post('/user/register', payload);
			
			const { todos, id, name } = response.data as FetchCurrentUserResponse;

			syncTodosState(todos);

			return { id, name } as User;

		} catch (err: any) {
			return thunkAPI.rejectWithValue(err.response?.data?.message || 'Register failed');
		}
	}
);

export const fetchCurrentUser = createAsyncThunk(
	'auth/fetchCurrentUser',
	async (_, thunkAPI) => {
		try {
			const response = await api.get('/me');

			const { id, name, todos } = response.data as FetchCurrentUserResponse;
			
			syncTodosState(todos)
			
			return ({ id, name })

		} catch {
			return thunkAPI.rejectWithValue(null);
		}
	}
);