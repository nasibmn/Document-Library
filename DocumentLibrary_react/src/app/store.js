import { configureStore } from "@reduxjs/toolkit";
import documentReducer from "../features/DocumnentSlicer";

export const store = configureStore({
  reducer: {
    docs: documentReducer,
  },
});
