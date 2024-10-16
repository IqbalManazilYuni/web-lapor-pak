// src/features/dataSlice.ts
import { DataPengaduan } from '@/app/_store/jenisPengaduanModel';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface DataState {
  items: DataPengaduan[];
  loading: boolean;
  error: string | null;
}

const initialState: DataState = {
  items: [],
  loading: false,
  error: null,
};

export const fetchDataPengaduan = createAsyncThunk('data/fetchDataPengaduan', async () => {
  const response = await axios.get('http://localhost:5000/api/pengaduan');
  return response.data.payload;
});

const dataSlicePengaduan = createSlice({
  name: 'data2',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDataPengaduan.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDataPengaduan.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchDataPengaduan.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch data';
      });
  },
});

export default dataSlicePengaduan.reducer;
