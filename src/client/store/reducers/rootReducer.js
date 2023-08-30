import { combineReducers } from '@reduxjs/toolkit';
import { apiSlice } from '../../api/apiSlice';

export const rootReducer = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer
});