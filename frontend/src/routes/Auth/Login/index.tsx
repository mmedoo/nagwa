import { Link, useNavigate } from "react-router";
import { useEffect, useRef, useState } from "react";
import Input from "../../../components/Input";
import { login } from "../../../features/auth/authThunks";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../app/store";
import Spinner from "../../../components/Spinner";

export default function Login({ setErrorMessage }) {

	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();
	const formRef = useRef<HTMLFormElement>(null);

	const [loading, setLoading] = useState<Boolean>(false);
	
	useEffect(() => {
		const form = formRef.current;
		if (!form) return;

		const setFormAsInvalid = (message: string) => {
			setErrorMessage(message)
			form?.classList.add("error");
			form?.email?.setAttribute("required", true)
			form?.password?.setAttribute("required", true)
		}

		const handleSubmit = async (e: SubmitEvent) => {
			e.preventDefault();
			form?.classList.remove("error");

			setLoading(true);
			
			const formData = new FormData(form);
			const email = formData.get("email");
			const password = formData.get("password");
			const rememberMe = formData.get("rememberMe") === 'on' ? true : false;

			if (!email || !password) {
				setFormAsInvalid('Invalid Credentials');
				return;
			}

			const action = await dispatch(
				login({
					email: email as string,
					password: password as string,
					rememberMe
				})
			);

			if (login.rejected.match(action)) {
				setFormAsInvalid('Invalid Credentials');
				return;
			}

		}

		form?.addEventListener("submit", handleSubmit);
		return () => {
			form?.removeEventListener("submit", handleSubmit);
		}
	}, []);

	useEffect(() => {
		if (!formRef.current) return;
		for (let input of formRef.current) {
			loading ? input.setAttribute("disabled", "true")
			: input.removeAttribute("disabled");
		}
	}, [loading])
	
	return (
		<>
			<form ref={formRef} id="login">
				<Input
					type="email"
					placeholder="Email Address"
					id="email"
					name="email"
				/>

				<Input
					type="password"
					placeholder="Password"
					id="password"
					name="password"
					pattern={/^.{8,}$/}
				/>

				<br />

				<input type="checkbox" name="rememberMe" id="rme" />
				<label htmlFor="rme">Remeber Me</label>

				<br />
				<br />

				<button className="primary-button button-3" type="submit">
					Login
					<Spinner />
				</button>

			</form>
			<Link to={'/auth/signup'}>
				New User? Register Here!
			</Link>
		</>
	);
}