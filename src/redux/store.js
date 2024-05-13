import { configureStore } from "@reduxjs/toolkit";
import TableSlice from "./ReduxTable";
export const store = configureStore({
  reducer: {
    table: TableSlice,
  },
});
