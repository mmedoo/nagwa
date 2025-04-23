import { Outlet, Route, Routes } from "react-router";
import { lazy, useState } from "react";
import { Suspense } from "react";
import PrivateRoute from "../../components/PrivateRoute";
import "./auth.css";

const Login = lazy(() => import("./Login"));
const SignOut = lazy(() => import("./SignOut"));
const SignUp = lazy(() => import("./SignUp"));

export default function Auth() {

	const [errorMessage, setErrorMessage] = useState<string>("");

	return (
		<Suspense>
			<Routes>

				<Route element={
					<div className="cont">
						<h1>Nagwa Todo-list</h1>

						<Outlet />
						
						<div className="error-message">
							<p>{errorMessage}</p>
						</div>
					</div>
				}>
					<Route path="login" element={
						<PrivateRoute forAuthed={false} element={<Login setErrorMessage={setErrorMessage} />} />
					} />
					<Route path="signup" element={
						<PrivateRoute forAuthed={false} element={<SignUp setErrorMessage={setErrorMessage} />} />
					} />

				</Route>


				<Route path="signout" element={
					<PrivateRoute element={<SignOut />} />
				} />

			</Routes>
		</Suspense>
	);
}