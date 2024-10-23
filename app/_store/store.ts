// store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import menuReducer from '../_utils/menu/menuSlice';
import dataReducer from '../_utils/data/dataSlice';
import dataReducerKK from '../_utils/data/dataSliceKK';
import dataReducerPengaduan from '../_utils/data/dataPengaduan'
import dataReducerUser from '../_utils/data/dataUser'
import dataReducerSummary from '../_utils/data/dataSummary'
import dataReducerSertifikat from "../_utils/data/dataSertifikat"
import authReducer from "../_utils/data/dataAuth"
const store = configureStore({
  reducer: {
    menu: menuReducer,
    data: dataReducer,
    data1: dataReducerKK,
    data2: dataReducerPengaduan,
    data3: dataReducerUser,
    data4: dataReducerSummary,
    data5: dataReducerSertifikat,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
