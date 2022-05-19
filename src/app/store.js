import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from "@reduxjs/toolkit/query";

import memoReducer from "../features/memo/memoSlice";
import { newsApi } from "../services/news";

// Redux DevTools 도 자동으로 포함됨
export const store = configureStore({
  reducer: {
    memo: memoReducer,
    [newsApi.reducerPath]: newsApi.reducer,
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(newsApi.middleware),
});

setupListeners(store.dispatch);