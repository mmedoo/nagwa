import { Suspense, useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { Route, Routes } from "react-router"
import { AppDispatch, subscribeToStore } from "./app/store"
import { lazy } from "react"
import Message from "./components/Message"
import PrivateRoute from "./components/PrivateRoute"
import api from "./app/api"
import { setUser } from "./features/auth/authSlice"
import { setListsFromUnmapped } from "./features/todos/todosSlice"
import { FetchCurrentUserResponse } from "./features/auth/authThunks"

const List = lazy(() => import("./routes/List"))
const Auth = lazy(() => import("./routes/Auth"))
const Home = lazy(() => import("./routes/Home"))
const NotFound = lazy(() => import("./routes/NotFound"))

let mounted = false;
export default function App() {

	const dispatch = useDispatch<AppDispatch>();
	
	const [isAppReady, setIsAppReady] = useState(false);
	
	useEffect(() => {
		async function fetchUser() {
			mounted = true;
			try {
				const response = await api.get('/me');
				
				const { id, name, todos } = response.data as FetchCurrentUserResponse;
				
				dispatch(setListsFromUnmapped(todos));
				
				dispatch(setUser({ id, name }));
				
				subscribeToStore();
				
			} catch (error) {
				return;
			} finally {
				setIsAppReady(true);
			}
		}
		
		if (!mounted) {
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

					<Route path="/" element={
						<PrivateRoute element={<Home />} />
					} />

					<Route path="/auth/*" element={<Auth />} />

					<Route path="/:listId/:taskId?" element={
						<PrivateRoute element={<List />} />
					} />

					<Route path="/404" element={<NotFound />} />

					<Route path="*" element={<NotFound />} />
					
				</Routes>
				
			</Suspense>
	)
}