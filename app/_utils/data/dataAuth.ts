import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
  _id: string;
  username: string;
  name: string;
  nomor_hp: string;
  address: string;
  role: string;
  uri_profile: string;
}

interface UserState {
  token: string | null;
  pengguna: User | null;
}

const initialState: UserState = {
  token: null,
  pengguna: null,
};

const userSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      console.log("Payload setUser:", action.payload);
      state.token = action.payload.token;
      state.pengguna = action.payload.pengguna;
    },
    clearUser: () => initialState,
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
