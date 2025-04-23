import { store } from "../../app/store";
import { ListIdType, TaskData, TaskIdType } from "../../types";
import { setSelected } from "../selectedSlice";
import { addTodo, deleteTodo } from "./todosSlice";

/**
 * Adds a new to-do item to the store and updates the selected item with the generated ID.
 *
 * @param args - The arguments required to create a new to-do item.
 * @returns void
 *
 * This function performs the following steps:
 * 1. Dispatches the `addTodo` action with the provided arguments to add a new to-do item.
 * 2. Extracts the generated ID of the newly created to-do item from the action's result.
 * 3. Dispatches the `setSelected` action to update the selected item in the store with the generated ID.
 */
export const addToDoAndUpdateSelection = (args: { listId: ListIdType; taskTitle?: string; taskInstance?: TaskData }) => {
	const result = store.dispatch(addTodo(args));
	const generatedId = result.payload.task.id;
	store.dispatch(setSelected(generatedId));
}


/**
 * Deletes a todo item and updates the selection in the store.
 * 
 * This function performs the following steps:
 * 1. Checks if the currently selected task matches the task to be deleted.
 *    - If not, it simply deletes the task and exits.
 * 2. If the selected task matches the task to be deleted:
 *    - Finds the corresponding task list by `listId`.
 *    - Determines the index of the task to be deleted within the list.
 *    - Updates the selection to the next task in the list, the previous task,
 *      or an empty string if no other tasks exist.
 * 3. Deletes the task from the store.
 * 
 * @param args - The arguments required to delete the task and update the selection.
 * @param args.taskId - The ID of the task to be deleted.
 * @param args.listId - The ID of the list containing the task.
 * 
 * @remarks
 * - If the task list cannot be found or the task ID is invalid, the function exits early.
 * - The selection is updated to maintain a valid state after the deletion.
 */
export const deleteTodoAndUpdateSelection = (
	args: {
		taskId: TaskIdType,
		listId: TaskIdType
	}
) => {
	const { todos, selected } = store.getState(); 
	
	if (selected !== args.taskId) {
		store.dispatch(deleteTodo(args));
		return;
	}

	const tasksList = todos.find(lst => lst.id === args.listId);
	if (!tasksList)
		return;
	
	const taskIds = tasksList.tasks.allIds;
	
	const currentTaskIndex = taskIds.findIndex((id) => id === args.taskId);
	if (currentTaskIndex === -1) {
		return;
	}
	const selection_replacement = taskIds[currentTaskIndex + 1] ?? taskIds[currentTaskIndex - 1] ?? "";
	store.dispatch(setSelected(selection_replacement))
	store.dispatch(deleteTodo(args));
}
