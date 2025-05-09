import { User } from "./AuthTypes";
import { UnMappedListData } from "./TodosTypes";

/**
 * Represents the response structure for fetching the current user.
 *
 * @property user - The user object containing details about the current user.
 * @property todos - An array of unmapped list data associated with the user.
*/
export interface FetchCurrentUserResponse {
	/**
	 * user - The user object containing details about the current user.
	*/
	user: User;

	/**
	 * todos - An array of unmapped list data associated with the user.
	*/
	todos: UnMappedListData[];
}
