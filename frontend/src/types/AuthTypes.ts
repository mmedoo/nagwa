/**
 * Represents a user in the system.
 * @property id - Unique identifier for the user.
 * @property name - Name of the user.
*/
export interface User {
	/**
	 * Unique identifier for the user.
	*/
	id: string;

	/**
	 * Name of the user.
	*/
	name: string;
}

/**
 * Represents authentication data for a user.
 * @property authStatus - Indicates whether the user is authenticated.
 * @property user - Optional user details including ID and name.
*/
export interface AuthData {
	/**
	 * Indicates whether the user is authenticated.
	*/

	authStatus: boolean;
	/**
	 * Optional user details including ID and name.
	*/
	user?: User;
}