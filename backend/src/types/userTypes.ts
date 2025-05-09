import { TodosListsResponse } from "./todosTypes";

export type UserIdType = number;

/**
 * Represents the attributes of a user model.
 * 
 * @property id - The unique identifier for the user (optional).
 * @property name - The name of the user.
 * @property email - The email address of the user.
 * @property hashedPassword - The hashed password of the user.
*/
export interface UserModelAttributes {
	/**
	 * The unique identifier for the user (optional).
	*/
	id?: UserIdType;

	/**
	 * The name of the user.
	*/
	name: string;

	/**
	 * The email address of the user.
	*/
	email: string;

	/**
	 * The hashed password of the user.
	*/
	hashedPassword: string;
}

/**
 * Represents the response body for a fetched user.
 *
 * @property user - An object containing user details.
 * @property user.id - The unique identifier of the user.
 * @property user.name - The name of the user, derived from `UserModelAttributes['name']`.
 * @property todos - The list of todos associated with the user, represented by `TodosListsResponse`.
*/
export interface FetchedUserResponseBody {
	/**
	 * An object containing user details.
	*/
	user: {
		/**
		 * The unique identifier of the user.
		*/
		id: UserIdType;

		/**
		 * The name of the user.
		*/
		name: UserModelAttributes['name'];
	};
	/**
	 * The list of todos associated with the user.
	*/
	todos: TodosListsResponse;
}