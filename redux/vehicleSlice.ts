import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Vehicle } from '../types/Vehicle';

interface VehicleState {
  data: Vehicle[];
  filteredData: Vehicle[];
  isLoading: boolean;
  error: string | null;
  viewMode: 'json' | 'table';
}

const initialState: VehicleState = {
  data: [],
  filteredData: [],
  isLoading: false,
  error: null,
  viewMode: 'json',
};

const vehicleSlice = createSlice({
  name: 'vehicle',
  initialState,
  reducers: {
    setVehicleData: (state, action: PayloadAction<Vehicle[]>) => {
      state.data = action.payload;
      state.filteredData = action.payload;
    },
    filterVehicleData: (state, action: PayloadAction<Vehicle[]>) => {
      state.filteredData = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setViewMode: (state, action: PayloadAction<'json' | 'table'>) => {
      state.viewMode = action.payload;
    },
  },
});

export const { setVehicleData, filterVehicleData, setLoading, setError, setViewMode } = vehicleSlice.actions;
export default vehicleSlice.reducer;