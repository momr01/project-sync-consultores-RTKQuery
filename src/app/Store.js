import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";
import SearchSlice from "./SearchSlice";

const Store = configureStore({
  reducer: {
    search: SearchSlice,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export default Store;
