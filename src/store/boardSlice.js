import { createSlice } from '@reduxjs/toolkit';

const boardSlice = createSlice({
    name: 'board',
    initialState: {
        length: 5,
        data: null,
        selectedCell: {y: 0, x: 0},
    },
    reducers: {
        setBoardData(state, action) {
            state.data = action.payload;
        },
        setSelectedCell(state, action) {
            state.selectedCell = action.payload;
        },
    }
});

export default boardSlice.reducer;
export const { setBoardData, setSelectedCell } = boardSlice.actions;
