import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import favouriteReducer from '../features/favouriteSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    favourite: favouriteReducer,
  },
});
