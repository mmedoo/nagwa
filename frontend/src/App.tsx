import { Suspense, useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { Route, Routes } from "react-router"
import { AppDispatch } from "./app/store"
import { lazy } from "react"
import Message from "./components/Message"
import PrivateRoute from "./components/PrivateRoute"
import { fetchCurrentUser } from "./features/auth/authThunks"

const List = lazy(() => import("./routes/List"))
const Auth = lazy(() => import("./routes/Auth"))
const Home = lazy(() => import("./routes/Home"))
const NotFound = lazy(() => import("./routes/NotFound"))

export default function App() {

	const dispatch = useDispatch<AppDispatch>();
	const [isAppReady, setIsAppReady] = useState(false);
	
	useEffect(() => {
		async function fetchUser() {
			try {
				await dispatch( fetchCurrentUser() )
			} catch (error) {
				console.error("Error fetching user:", error);
			} finally {
				setIsAppReady(true);
			}
		}
		fetchUser();
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