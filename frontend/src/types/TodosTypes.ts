export type TaskIdType = string;
/**
 * Represents the data structure for a task.
 * @property id - Unique identifier for the task.
 * @property title - Title of the task.
 * @property completed - Indicates whether the task is completed.
 * @property description - Optional description of the task.
*/
export type TaskData = {
	/**
	 * Unique identifier for the task
	*/
	id: TaskIdType;

	/**
	 * Title of the task
	*/
	title: string;

	/**
	* Task Completion
	*/
	completed: boolean;

	/**
	* Description of the task
	*/
	description?: string;
};

export type ListIdType = string;

/**
 * Represents the structure of a mapped list containing tasks.
 * @property id - Unique identifier for the list.
 * @property title - Title of the list.
 * @property tasks - Object containing tasks associated with the list.
 * @property tasks.byId - A mapping of task IDs to their corresponding task data.
 * @property tasks.allIds - An array of all task IDs in the list.
*/
export type MappedListData = {
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
 * Represents the structure of an unmapped list containing tasks.
 * @property id - Unique identifier for the list.
 * @property title - Title of the list.
 * @property tasks - Array of task data associated with the list.
*/
export type UnMappedListData = {
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
	tasks: TaskData[];
};
