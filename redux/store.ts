import { configureStore } from '@reduxjs/toolkit';
import vehicleReducer from './vehicleSlice';

const store = configureStore({
  reducer: {
    vehicle: vehicleReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;