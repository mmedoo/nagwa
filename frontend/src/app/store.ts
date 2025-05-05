import { configureStore } from '@reduxjs/toolkit';
import todosReducer from '../features/todos/todosSlice';
import selectedReducer from '../features/selectedSlice'
import authReducer from '../features/auth/authSlice'
import { pushTodosToBackend } from '../features/todos/todosThunks';
import { debounce } from 'lodash';

export const store = configureStore({
	reducer: {
		todos: todosReducer,
		selected: selectedReducer,
		auth: authReducer
	}
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

const syncTodosDebounced = debounce((store) => {
	const { auth, todos } = store.getState();

	if (!auth || !auth.id)
		return;
	
	pushTodosToBackend(todos)

}, 0); // This mustn't be zero, It's just for faster testing results

export const subscribeToStore = () => {
	store.subscribe(() => {
		syncTodosDebounced(store);
	});
}
