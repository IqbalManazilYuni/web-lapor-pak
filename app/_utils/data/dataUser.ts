// src/features/dataSlice.ts
import { DataUser } from '@/app/_store/jenisPengaduanModel';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import axiosInstance from '../interceptor';

interface DataState {
  items: DataUser[];
  loading: boolean;
  error: string | null;
}

const initialState: DataState = {
  items: [],
  loading: false,
  error: null,
};

export const fetchDataUser = createAsyncThunk('data/fetchDataUser', async () => {
  try {
    const response = await axiosInstance.get('/pengguna');
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

const dataSliceUser = createSlice({
  name: 'data3',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDataUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDataUser.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchDataUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch data';
      });
  },
});

export default dataSliceUser.reducer;
