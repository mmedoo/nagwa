import { Route, Routes } from "react-router";
import { lazy, useState } from "react";
import { Suspense } from "react";
import "./auth.css";

const Login = lazy(() => import("./Login"));
const SignUp = lazy(() => import("./SignUp"));

export default function Auth() {

	const [errorMessage, setErrorMessage] = useState<string>("");

	return (
		<Suspense>
			<div className="cont">
				<h1>
					Nagwa Todo-list
				</h1>

				<Routes>
					<Route path="login" element={<Login setErrorMessage={setErrorMessage} />} />
					<Route path="signup" element={<SignUp setErrorMessage={setErrorMessage} />} />
				</Routes>

				<div className="error-message">
					<p>{errorMessage}</p>
				</div>
			</div>

		</Suspense>
	);
}