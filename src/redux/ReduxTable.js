import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
  isError: false,
  data: "asdf",
};

export const fetchData = createAsyncThunk("fetchData", async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  const data = await res.json();
  if (res.status !== 200) {
    throw new Error("something went wrong");
  }
  return data;
});

export const TableSlice = createSlice({
  name: "Table",
  initialState,
  reducers: {
    deleteItem: (state, action) => {
      state.data = state.data.filter((item) => item.id !== action.payload);
    },
    addItem: (state, action) => {
      state.data = [...state.data, action.payload];
    },
    updateItem: (state, action) => {
      state.data = state.data.map((item) => {
        if (item.id === action.payload.id) {
          return action.payload;
        }
        return item;
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        console.log("pending");
        state.isLoading = true;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        console.log("fulfilled");
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchData.rejected, (state) => {
        console.log("rejected");
        state.isLoading = false;
        state.isError = true;
      });
  },
});
export const { deleteItem, addItem, updateItem } = TableSlice.actions;
export default TableSlice.reducer;
