// store/menuSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface MenuState {
  selectedMenu: string;
}

const initialState: MenuState = {
  selectedMenu: 'dashboard',
};

const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    setSelectedMenu(state, action: PayloadAction<string>) {
      state.selectedMenu = action.payload;
      localStorage.setItem('selectedMenu', action.payload); // Persist to local storage
    },
    loadSelectedMenu(state) {
      const savedMenu = localStorage.getItem('selectedMenu');
      if (savedMenu) {
        state.selectedMenu = savedMenu; // Load the saved menu
      }
    },
  },
});

export const { setSelectedMenu, loadSelectedMenu } = menuSlice.actions;
export default menuSlice.reducer;
