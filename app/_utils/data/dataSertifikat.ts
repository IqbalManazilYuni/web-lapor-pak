// src/features/dataSlice.ts
import { Sertifikat } from '@/app/_store/jenisPengaduanModel';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

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
    const response = await axios.get('http://localhost:5000/api/sertifikat');
    return response.data.payload;
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
