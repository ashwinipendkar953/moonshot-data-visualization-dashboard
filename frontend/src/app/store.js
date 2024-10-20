import { configureStore } from "@reduxjs/toolkit";
import { dataReducer } from "../features/data/dataSlice";
import { authReducer } from "../features/auth/authSlice";

const store = configureStore({
  reducer: {
    data: dataReducer,
    auth: authReducer,
  },
});

export default store;
