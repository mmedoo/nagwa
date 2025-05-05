import axios from "axios";

const origin = import.meta.env.DEV ? 'http://localhost:1234' : 'https://production-url.com';

export default axios.create({
	baseURL: origin,
	headers: {
		"Content-Type": "application/json",
	},
	withCredentials: true,
});