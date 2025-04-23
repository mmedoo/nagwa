/**
 * This slice is responsible for handling the state of a selected task when viewing a list.
 * It provides an initial state of an empty string and a reducer to update the selected state.
 *
 * @function setSelected
 * A reducer function to update the selected state with the provided payload.
 * 
 * @param _state - The current state (not used in this case as the state is replaced).
 * @param action - The action object containing the payload to set as the new state.
 * 
 */
import { createSlice } from '@reduxjs/toolkit';


const selectedSlice = createSlice({
	name: 'selected',
	initialState: "",
	reducers: {
		setSelected(_state, action) {
			return action.payload;
		}
	},
});

export const { setSelected } = selectedSlice.actions;
export default selectedSlice.reducer;