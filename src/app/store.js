import { configureStore } from '@reduxjs/toolkit';
import appSliceReducer from '../features/appSlice';

export const store = configureStore({
  reducer: {
    appSlice: appSliceReducer,
  },
});
