import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: JSON.parse(localStorage.getItem("darkMode")) || false,
};

export const darkModeSlice = createSlice({
  name: "darkMode",
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      const newState = { ...state };
      newState.mode = !newState.mode;
      localStorage.setItem("darkMode", JSON.stringify(newState.mode));
      return newState;
    },
  },
});

export default darkModeSlice.reducer;
export const { toggleDarkMode } = darkModeSlice.actions;
