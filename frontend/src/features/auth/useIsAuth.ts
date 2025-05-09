import { useSelector } from "react-redux";
import { RootState } from "../../app/store";

/**
 * A custom React hook that prevents non-authenticated users from accessing certain parts of the application.
 * 
 * This hook checks the authentication status from the Redux store and redirects unauthenticated users
 * to the login page (`/auth/login`) using React Router's `useNavigate` function.
 * 
 * @remarks
 * - This hook relies on the `authStatus` property in the Redux store's `auth` slice.
 * 
 * @example
 * ```tsx
 * function ProtectedPage() {
 *   const isAuthenticated = useIsAuthed();
 * 
 * 	if (!isAuthenticated) {
 * 		return <Navigate to="/auth/login" />;
 * 	}
 * 
 *   return <div>Welcome to the protected page!</div>;
 * }
 * ```
 * 
 * @dependencies
 * - `useSelector` from `react-redux` to access the Redux store.
 */
export function useIsAuthed() {
	return useSelector((state: RootState) => state.auth.authStatus);
}