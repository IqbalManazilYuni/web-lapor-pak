// src/features/dataSlice.ts
import { Sertifikat } from '@/app/_store/jenisPengaduanModel';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import axiosInstance from '../interceptor';

interface DataState {
    items: Sertifikat[];
    loading: boolean;
    error: string | null;
}

const initialState: DataState = {
    items: [],
    loading: false,
    error: null,
};

export const fetchDataSertifikat = createAsyncThunk('data/fetchDataSertifikat', async () => {
    try {
        const response = await axiosInstance.get('/sertifikat');
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

const dataSliceSertifikat = createSlice({
    name: 'data5',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchDataSertifikat.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchDataSertifikat.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchDataSertifikat.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch data';
            });
    },
});

export default dataSliceSertifikat.reducer;
