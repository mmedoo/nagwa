import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthData } from "../../types/AuthTypes";
import { login, logout, register } from "./authThunks";

const initialState: AuthData = { authStatus: false };

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setUser: (_state, action: PayloadAction<AuthData>) => {
			return action.payload;
		}
	},
	extraReducers: builder => {
		builder
			.addCase(login.fulfilled, (_state, action: PayloadAction<AuthData>) => {
				return action.payload;
			})
			.addCase(register.fulfilled, (_state, action: PayloadAction<AuthData>) => {
				return action.payload;
			})
			.addCase(logout.fulfilled, () => {
				return { authStatus: false };
			});
	}
});

export const { setUser } = authSlice.actions;

export default authSlice.reducer;