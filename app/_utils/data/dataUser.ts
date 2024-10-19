// src/features/dataSlice.ts
import { DataUser } from '@/app/_store/jenisPengaduanModel';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

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
  const response = await axios.get('http://localhost:5000/api/pengguna');
  return response.data.payload;
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
