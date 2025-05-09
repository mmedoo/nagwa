import { Suspense, useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { Outlet, Route, Routes } from "react-router"
import { AppDispatch, subscribeToStore } from "./app/store"
import { lazy } from "react"
import Message from "./components/Message"
import PrivateRoute from "./components/PrivateRoute"
import api from "./app/api"
import { setUser } from "./features/auth/authSlice"
import { setListsFromUnmapped } from "./features/todos/todosSlice"
import { FetchCurrentUserResponse } from "./types/APITypes"

const List = lazy(() => import("./routes/List"))
const Auth = lazy(() => import("./routes/Auth"))
const Home = lazy(() => import("./routes/Home"))
const SignOut = lazy(() => import("./routes/SignOut"));
const NotFound = lazy(() => import("./routes/NotFound"))

let mounted = false;
export default function App() {

	const dispatch = useDispatch<AppDispatch>();
	
	const [isAppReady, setIsAppReady] = useState(false);
	
	useEffect(() => {
		async function fetchUser() {
			try {
				const response = await api.get<FetchCurrentUserResponse>('/me');
				
				const { user, todos } = response.data;
				
				dispatch(setListsFromUnmapped(todos));
				
				dispatch(setUser({ user, authStatus: true }));
				
				subscribeToStore();
				
			} catch (error) {
				return;
			} finally {
				setIsAppReady(true);
			}
		}
		
		if (!mounted) {
			mounted = true;
			fetchUser();
		}
	}, []);
	
	if (!isAppReady) {
		return (
			<Message>Loading...</Message>
		)
	}
	
	return (
			<Suspense fallback={<Message>Loading...</Message>}>

				<Routes>

					<Route element={ <PrivateRoute element={ <Outlet/> } /> }>
					
						<Route path="/" element={ <Home /> } />

						<Route path="/:listId/:taskId?" element={ <List /> } />
						
						<Route path="/signout" element={<SignOut />} />
					</Route>

					<Route element={ <PrivateRoute forAuthed={false} element={ <Outlet/> } /> }>

						<Route path="/auth/*" element={<Auth />} />
						
					</Route>


					<Route path="/404" element={<NotFound />} />

					<Route path="*" element={<NotFound />} />
					
				</Routes>

			</Suspense>
	)
}