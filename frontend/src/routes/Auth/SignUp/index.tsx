import { Link } from "react-router";
import { useEffect, useRef, useState } from "react";
import Input from "../../../components/Input";
import { register } from "../../../features/auth/authThunks";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../app/store";

export default function SignUp({ setErrorMessage }) {

	const [loading, setLoading] = useState<boolean>(false);
	const dispatch = useDispatch<AppDispatch>();
	const formRef = useRef<HTMLFormElement>(null);

	useEffect(() => {
		const form = formRef.current;

		const setFormAsInvalid = (message: string) => {
			setErrorMessage(message);
			form?.classList.add("error");
			form?.username?.setAttribute("required", true)
			form?.email?.setAttribute("required", true)
			form?.password?.setAttribute("required", true)
			form?.repw?.setAttribute("required", true)
		}

		const handleSubmit = async (e: SubmitEvent) => {
			if (!form) return;

			e.preventDefault();

			setLoading(true);
			
			form?.classList.remove("error");

			const formData = new FormData(form);
			const name = formData.get("username");
			const email = formData.get("email");
			const password = formData.get("password");
			const repw = formData.get("repw");
			const rememberMe = formData.get("rememberMe") === 'on' ? true : false;

			if (!name || !email || !password) {
				setFormAsInvalid('Invalid Credentials');
				return;
			}

			if (password !== repw) {
				setFormAsInvalid('Passwords Mismatch');
				return;
			}
			
			const action = await dispatch(
				register({
					name: name as string,
					email: email as string,
					password: password as string,
					rememberMe
				})
			);

			if (register.rejected.match(action)) {
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
		for (const input of formRef.current) {
			if (loading) {
				input.setAttribute("disabled", "true")
			} else {
				input.removeAttribute("disabled");
			}
		}
	}, [loading])
	
	return (
		<>
			<form ref={formRef} id="login">
				<Input
					type="text"
					placeholder="Name"
					id="username"
					name="username"
				/>

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

				<Input
					type="password"
					placeholder="Re-type Password"
					id="repw"
					name="repw"
					pattern={/^.{8,}$/}
				/>

				<br />

				<input type="checkbox" name="rememberMe" id="rme" />
				<label htmlFor="rme">Remeber Me</label>

				<br />
				<br />

				<button className="primary-button button-3" type="submit">
					Create Account
				</button>

			</form>
			<Link to={'/auth/login'}>
				Already a User? Login Here!
			</Link>
		</>
	);
}