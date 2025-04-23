export type TaskIdType = string;

export type TaskData = {
	/** Unique identifier for the task */
	id: TaskIdType;
	/** Title of the task */
	title: string;
	/** Task Completion */
	completed: boolean;
	/** Description of the task */
	description?: string;
}

export type ListIdType = string;
/**
 * Represents the structure of a list containing tasks.
 */
export type ListData = {
	/**
	 * Unique identifier for the list.
	 */
	id: ListIdType;

	/**
	 * Title of the list.
	 */
	title: string;

	/**
	 * Object containing tasks associated with the list.
	 */
	tasks: {
		/**
		 * A mapping of task IDs to their corresponding task data.
		 */
		byId: {
			[id: TaskIdType]: TaskData;
		};

		/**
		 * An array of all task IDs in the list.
		 */
		allIds: TaskIdType[];
	};
};


/**
 * Represents the authentication data for a user.
 * 
 * @property authed - A boolean indicating whether the user is authenticated.
 * @property username - An optional string representing the username of the authenticated user.
 */


export interface User {
	id: string;
	name: string;
};