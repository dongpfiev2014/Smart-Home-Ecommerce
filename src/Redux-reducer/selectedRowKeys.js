import { createSlice } from "@reduxjs/toolkit";

const selectedRowKeysSlice = createSlice({
  name: "selectedRowKeys",
  initialState: [],
  reducers: {
    setSelectedRowKeys(state, action) {
      return action.payload;
    },
  },
});

export default selectedRowKeysSlice.reducer;
export const { setSelectedRowKeys } = selectedRowKeysSlice.actions;
