/**
 * Represents a task with its associated properties.
 *
 * @interface TaskType
 * @property {number | string} id - The unique identifier for the task, which can be a number or a string.
 * @property {string} title - The title or name of the task.
 * @property {boolean} completed - Indicates whether the task has been completed.
 * @property {string} description - A detailed description of the task.
*/
export interface TaskType {
	/**
	 * The unique identifier for the task, which can be a number or a string.
	*/
	id: number | string;

	/**
	 * The title or name of the task.
	*/
	title: string;

	/**
	 * Indicates whether the task has been completed.
	*/
	completed: boolean;

	/**
	 * A detailed description of the task.
	*/
	description: string;
}

/**
 * Represents a list of todos.
 *
 * @interface TodoListType
 * @property {string | number} id - The unique identifier for the todo list.
 * @property {string} title - The title of the todo list.
 * @property {TaskType[]} tasks - An array of tasks associated with the todo list.
*/
export interface TodoListType {
	/**
	 * The unique identifier for the todo list.
	*/
	id: string | number;

	/**
	 * The title of the todo list.
	*/
	title: string;

	/**
	 * An array of tasks associated with the todo list.
	*/
	tasks: TaskType[];
}

export interface TodosModelAttributes {
	userId: number;
	todos: string;
}

/**
 * Represents the response type for a list of todo lists sent to the frontend.
 */
export type TodosListsResponse = TodoListType[];