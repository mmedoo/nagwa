import axios from "axios";

const origin = 'http://localhost:1234';

export default axios.create({
	baseURL: origin,
	headers: {
		"Content-Type": "application/json",
	},
	withCredentials: true,
});