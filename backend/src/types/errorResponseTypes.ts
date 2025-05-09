/**
 * Represents the structure of an error response body.
 * This type is used to standardize the format of error messages
 * returned by the backend.
 *
 * @property error - A string describing the error message.
*/
export type ErrorResponseBody = {	
	/**
	 * A string describing the error message.
	*/
	error: string;
}
