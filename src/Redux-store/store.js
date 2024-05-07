import { configureStore } from "@reduxjs/toolkit";
import darkModeReducer from "../Redux-reducer/darkModeSlice";
import authenReducer from "../Redux-reducer/auth";
import { contentsReducer, productsReducer } from "../Redux-reducer/data";
import selectedRowKeysReducer from "../Redux-reducer/selectedRowKeys";
import searchValueReducer from "../Redux-reducer/search";

export const store = configureStore({
  reducer: {
    darkMode: darkModeReducer,
    authen: authenReducer,
    contents: contentsReducer,
    products: productsReducer,
    selectedRowKeys: selectedRowKeysReducer,
    searchValue: searchValueReducer,
  },
});
