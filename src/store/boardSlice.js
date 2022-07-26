import { createSlice } from '@reduxjs/toolkit';

const boardSlice = createSlice({
    name: 'board',
    initialState: {
        length: 5,
        coordinates: '',
    },
    reducers: {
        setBoardCoordinates(state, action) {
            state.coordinates = action.payload;
        },
    }
});

export default boardSlice.reducer;
export const { setBoardCoordinates } = boardSlice.actions;
