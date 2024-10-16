// src/features/dataSlice.ts
import { KabupatenKota } from '@/app/_store/jenisPengaduanModel';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface DataState {
  items: KabupatenKota[];
  loading: boolean;
  error: string | null;
}

const initialState: DataState = {
  items: [],
  loading: false,
  error: null,
};

export const fetchDataKK = createAsyncThunk('data/fetchDataKK', async () => {
  const response = await axios.get('http://localhost:5000/api/kabupatenkota');
  return response.data.payload;
});

const dataSliceKK = createSlice({
  name: 'data1',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDataKK.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDataKK.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchDataKK.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch data';
      });
  },
});

export default dataSliceKK.reducer;
