// store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import menuReducer from '../_utils/menu/menuSlice';
import dataReducer from '../_utils/data/dataSlice';

const store = configureStore({
  reducer: {
    menu: menuReducer,
    data: dataReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
