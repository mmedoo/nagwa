import { createSlice, PayloadAction, nanoid } from '@reduxjs/toolkit';
import { MappedListData, ListIdType, TaskData, TaskIdType, UnMappedListData } from '../../types';

const todosSlice = createSlice({
	name: 'todos',
	initialState: [] as MappedListData[],
	reducers: {
		addTodo: {
			reducer(state, action: PayloadAction<{ listId: ListIdType; task: TaskData }>) {
				const { listId, task } = action.payload;

				const list = state.find((l) => l.id === listId);
				if (!list)
					return;

				list.tasks.byId[task.id] = task;

				if (!list.tasks.allIds.includes(task.id)) {
					list.tasks.allIds.push(task.id);
				}
			},
			prepare(taskInput: { listId: ListIdType; taskTitle?: string; taskInstance?: TaskData }) {
				const { taskTitle, taskInstance, listId } = taskInput;
				if (taskInstance) {
					return {
						payload: {
							listId,
							task: taskInstance,
						},
					};
				}
				if (taskTitle) {
					return {
						payload: {
							listId,
							task: {
								id: nanoid(4),
								title: taskTitle,
								completed: false,
							} as TaskData,
						},
					};
				}
				throw new Error('Either taskTitle or taskInstance must be provided.');
			},
		},

		toggleTodoCompletion(state, action: PayloadAction<{ listId: ListIdType; taskId: TaskIdType; force?: boolean }>) {
			const { listId, taskId, force } = action.payload;

			const list = state.find((l) => l.id === listId);
			if (!list)
				return;

			const task = list.tasks.byId[taskId];
			if (!task)
				return;

			task.completed = force ?? !task.completed;
		},

		deleteTodo(state, action: PayloadAction<{ listId: ListIdType; taskId: TaskIdType }>) {
			const { listId, taskId } = action.payload;

			const list = state.find((l) => l.id === listId);
			if (!list)
				return;

			const taskIndex = list.tasks.allIds.indexOf(taskId);

			if (taskIndex !== -1)
				list.tasks.allIds.splice(taskIndex, 1);

			delete list.tasks.byId[taskId];
		},

		updateTodo(
			state,
			action: PayloadAction<{ listId: ListIdType; updatedTask: { id: TaskIdType } & Partial<TaskData> }>
		) {
			const list = state.find((t) => t.id === action.payload.listId);
			if (!list)
				return;

			const task = list.tasks.byId[action.payload.updatedTask.id];
			if (!task)
				return;

			for (const key in action.payload.updatedTask) {
				if (key !== 'id') {
					task[key] = action.payload.updatedTask[key];
				}
			}
		},

		switchTodos(state, action: PayloadAction<{ listId: ListIdType; from: TaskIdType; to: TaskIdType }>) {
			const { from, to, listId } = action.payload;
			if (from === to)
				return;

			const list = state.find((l) => l.id === listId);
			if (!list)
				return;

			const fromIndex = list.tasks.allIds.indexOf(from);
			const toIndex = list.tasks.allIds.indexOf(to);

			if (fromIndex === -1 || toIndex === -1)
				return;

			const [movedTodo] = list.tasks.allIds.splice(fromIndex, 1);
			list.tasks.allIds.splice(toIndex, 0, movedTodo);
		},

		addList: {
			reducer(state, action: PayloadAction<{ list: MappedListData }>) {
				state.push(action.payload.list);
			},
			prepare(listInput: { title?: string; instance?: MappedListData }) {
				const { title, instance } = listInput;
				if (instance) {
					return {
						payload: {
							list: instance,
						},
					};
				}
				if (title) {
					return {
						payload: {
							list: {
								id: nanoid(4),
								title,
								tasks: {
									byId: {},
									allIds: [],
								},
							} as MappedListData,
						},
					};
				}
				throw new Error('Either title or instance must be provided.');
			},
		},

		removeList(state, action: PayloadAction<{ listId: ListIdType }>) {
			const { listId } = action.payload;
			const listIndex = state.findIndex((l) => l.id === listId);

			if (listIndex !== -1) {
				state.splice(listIndex, 1);
			}
		},

		setListsFromUnmapped(state, action: PayloadAction<UnMappedListData[]>) {
			// Clear the current state
			state.length = 0;

			// Populate the state with the new todos
			for (const list of action.payload) {
				const mappedList: MappedListData = {
					id: list.id,
					title: list.title,
					tasks: {
						byId: Object.fromEntries(
							list.tasks.map((task) => [task.id, task])
						),
						allIds: list.tasks.map((task) => task.id),
					},
				};

				state.push(mappedList);
			}
		}
	},
});

export const {
	addTodo,
	toggleTodoCompletion,
	deleteTodo,
	updateTodo,
	switchTodos,
	addList,
	removeList,
	setListsFromUnmapped,
} = todosSlice.actions;

export default todosSlice.reducer;