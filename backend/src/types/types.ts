export interface User {
	userId: string;
	email: string;
	hashedPassword: string;
}

export interface Todos {
	userId: string;
	todos: string;
}