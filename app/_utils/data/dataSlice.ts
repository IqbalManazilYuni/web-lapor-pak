// src/features/dataSlice.ts
import { JenisPengaduan } from '@/app/_store/jenisPengaduanModel';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import axiosInstance from '../interceptor';

interface DataState {
  items: JenisPengaduan[];
  loading: boolean;
  error: string | null;
}

const initialState: DataState = {
  items: [],
  loading: false,
  error: null,
};

export const fetchData = createAsyncThunk('data/fetchData', async () => {
  try {
    const response = await axiosInstance.get('/jenispengaduan');
    return response.data.payload;
  } catch (error) {
    console.error('Fetch error:', error); // Log the entire error object
    if (axios.isAxiosError(error)) {
      if (error.response) {
        throw error.response.data.message
      }
    }
    throw error;
  }
});

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch data';
      });
  },
});

export default dataSlice.reducer;
