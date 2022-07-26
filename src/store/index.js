import { combineReducers, configureStore } from '@reduxjs/toolkit';
import boardSlice from "./boardSlice";

const rootReducer = combineReducers({
    board: boardSlice,
});

export const store = configureStore({
    reducer: rootReducer,
});