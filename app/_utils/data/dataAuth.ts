import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
    token: string | null;
    expiry: string | null;
    pengguna: {
        _id: string;
        username: string;
        name: string;
        nomor_hp: string;
        addres: string;
        role: string;
        uri_profle: string;
    } | null;
}

const initialState: UserState = {
    token: null,
    expiry: null,
    pengguna: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<UserState>) => {
            return { ...state, ...action.payload };
        },
        clearUser: () => initialState,
    },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;