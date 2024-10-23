// src/features/dataSlice.ts
import { Summary } from '@/app/_store/jenisPengaduanModel';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import axiosInstance from '../interceptor';

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

    try {
        const response = await axiosInstance.get('/pengaduan/summary');
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
