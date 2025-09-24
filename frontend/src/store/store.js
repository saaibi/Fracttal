import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from './slices/tasksSlice';
import authReducer from './slices/authSlice';
import categoriesReducer from './slices/categoriesSlice';

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    auth: authReducer,
    categories: categoriesReducer,
  },
});
