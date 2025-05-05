import { Navigate } from "react-router";
import { useIsAuthed } from "../../features/auth/useIsAuth";

type PrivateRouteProps = {
	/**
	 * The element to render if the user is allowed to access the route.
	 */
	element: React.ReactNode;
	
	/**
	 * If true, the route is for authenticated users.
	 * If false, the route is for non-authenticated users
	 * @default true
	 */
	forAuthed?: boolean;
}

export default function PrivateRoute(
	{ element, forAuthed = true }
	: PrivateRouteProps
) {
	const isAuthenticated = useIsAuthed();
	
	if (Boolean(isAuthenticated.id) !== forAuthed) {

		// If element is for authed users, redirect to login
		// If element is for non-authed users, redirect to home
		return <Navigate to={forAuthed ? "/auth/login" : "/"} />;
	}
	
	return element;
}