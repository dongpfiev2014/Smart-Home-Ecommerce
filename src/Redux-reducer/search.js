import { createSlice } from "@reduxjs/toolkit";

const searchValue = createSlice({
  name: "valueSearch",
  initialState: "",
  reducers: {
    setSearchValue(state, action) {
      return action.payload;
    },
  },
});

export default searchValue.reducer;
export const { setSearchValue } = searchValue.actions;
