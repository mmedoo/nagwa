import { createAsyncThunk } from '@reduxjs/toolkit';
import api from "../../app/api"
import { UnMappedListData } from "../../types/TodosTypes";
import { AuthData } from "../../types/AuthTypes";
import { FetchCurrentUserResponse } from "../../types/APITypes";
import { store, subscribeToStore } from '../../app/store';
import { setListsFromUnmapped } from '../todos/todosSlice';

const syncTodosState = (todos: UnMappedListData[]) => {	
	store.dispatch(setListsFromUnmapped(todos));
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
	async (payload: { email: string, password: string, rememberMe: boolean }, thunkAPI): Promise<AuthData | ReturnType<typeof thunkAPI.rejectWithValue>> => {
		try {
			const response = await api.post<FetchCurrentUserResponse>('/user/login', payload);

			const { todos, user } = response.data;
			
			syncTodosState(todos);

			subscribeToStore();

			return { user, authStatus: true };
			
		} catch (err: any) {
			return thunkAPI.rejectWithValue(err.response?.data?.message || 'Login failed');
		}
	}
);

export const register = createAsyncThunk(
	'auth/register',
	async (payload: { email: string; password: string, name: string, rememberMe: boolean }, thunkAPI): Promise<AuthData | ReturnType<typeof thunkAPI.rejectWithValue>> => {
		try {
			const response = await api.post<FetchCurrentUserResponse>('/user/register', payload);
			
			const { todos, user } = response.data;

			syncTodosState(todos);

			subscribeToStore();
			
			return { user, authStatus: true };

		} catch (err: any) {
			return thunkAPI.rejectWithValue(err.response?.data?.message || 'Register failed');
		}
	}
);