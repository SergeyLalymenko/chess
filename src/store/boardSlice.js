import { createSlice } from '@reduxjs/toolkit';

const boardSlice = createSlice({
    name: 'board',
    initialState: {
        length: 5,
        data: null,
    },
    reducers: {
        setBoardData(state, action) {
            state.data = action.payload;
        },
    }
});

export default boardSlice.reducer;
export const { setBoardData } = boardSlice.actions;
