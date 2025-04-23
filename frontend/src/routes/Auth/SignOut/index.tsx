import { useEffect } from "react";
import Message from "../../../components/Message";
import { useDispatch } from "react-redux";
import { logout } from "../../../features/auth/authThunks";
import { AppDispatch } from "../../../app/store";

export default function SignOut() {
	
	const dispatch = useDispatch<AppDispatch>();

	useEffect(() => {
		dispatch(
			logout()
		)
	}, []);
	
	return (
		<Message>Signing Out...</Message>
	)
}