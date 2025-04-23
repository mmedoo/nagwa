import { createSelector } from "@reduxjs/toolkit";
import { ListIdType, TaskData, TaskIdType } from "../../types";
import { RootState } from "../../app/store";

export const get_all_taskData_from_listId = createSelector(
	(state: RootState) => state.todos,
	(_state: RootState, listId: ListIdType | undefined) => listId,
	(todos, listId) => {
		if (!listId)
			return undefined;

		const list = todos.find(lst => lst.id === listId);
		if (!list)
			return undefined;

		return list.tasks.allIds.map(id => list.tasks.byId[id]);
	}
);

export const get_single_taskData = createSelector(
	[
		(_state: RootState, listId: ListIdType) => listId,
		(_state: RootState, _listId: ListIdType, taskId: TaskIdType) => taskId,
		(state: RootState) => state.todos
	],
	(listId, taskId, todos) => {
		if (!listId || !taskId)
			return undefined;

		const list = todos.find(lst => lst.id === listId);
		if (!list)
			return undefined;

		return list.tasks.byId[taskId];
	}
);

export const get_list_completion_percentage = createSelector(
	(_state: RootState, listId: ListIdType) => listId,
	(state: RootState) => state.todos,
	(listId, todos) => {
		const list = todos.find(lst => lst.id === listId);
		if (!list)
			return;

		const tasks = Object.values(list.tasks.byId);
		if (tasks.length === 0) {
			return 0;
		}
		const completed = tasks.filter((tsk: TaskData) => tsk.completed);
		return (completed.length * 100 / tasks.length).toFixed(0);
	}
);

export const get_all_taskData_ordered = createSelector(
	(_state: RootState, listId: ListIdType) => listId,
	(state: RootState) => state.todos,
	(listId, todos) => {
		if (!listId)
			return undefined;

		const list = todos.find(lst => lst.id === listId);
		if (!list)
			return undefined;

		const taskMap = list.tasks.byId;
		return list.tasks.allIds.map((id: TaskIdType) => taskMap[id]);
	}
)