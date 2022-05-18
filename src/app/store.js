import { configureStore } from '@reduxjs/toolkit';
import memoReducer from "../features/memo/memoSlice";

// Redux DevTools 도 자동으로 포함됨
export const store = configureStore({
  reducer: {
    memo: memoReducer,
  },
});