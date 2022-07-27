import { combineReducers, configureStore } from '@reduxjs/toolkit';
import boardSlice from './boardSlice';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
    board: boardSlice,
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: [thunk],
});
