// src/features/dataSlice.ts
import { Summary } from '@/app/_store/jenisPengaduanModel';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface DataState {
    items: Summary[];
    loading: boolean;
    error: string | null;
}

const initialState: DataState = {
    items: [],
    loading: false,
    error: null,
};

export const fetchDataSummary = createAsyncThunk('data/fetchDataSummary', async () => {
    const response = await axios.get('http://localhost:5000/api/pengaduan/summary');
    return response.data.payload;
});

const dataSliceSummary = createSlice({
    name: 'data4',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchDataSummary.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchDataSummary.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchDataSummary.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch data';
            });
    },
});

export default dataSliceSummary.reducer;
