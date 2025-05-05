import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../types";
import { login, logout, register } from "./authThunks";

const authSlice = createSlice({
	name: 'auth',
	initialState: {} as User,
	reducers: {
		setUser: (_state, action: PayloadAction<User>) => {
			return action.payload;
		}
	},
	extraReducers: builder => {
		builder
			.addCase(login.fulfilled, (_state, action: PayloadAction<User>) => {
				return action.payload;
			})
			.addCase(register.fulfilled, (_state, action: PayloadAction<User>) => {
				return action.payload;
			})
			.addCase(logout.fulfilled, () => {
				return {} as User;
			});
	}
});

export const { setUser } = authSlice.actions;

export default authSlice.reducer;