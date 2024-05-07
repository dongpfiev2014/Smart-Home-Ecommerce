import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  currentUser: undefined,
  isLoading: false,
};

const API_USERS_URL = "https://6623cafa3e17a3ac8470401a.mockapi.io/api/users";
const API_LOGIN_URL = "https://dummyjson.com/auth/login";

export const register = createAsyncThunk(
  "auth/register",
  async (userData, thunkAPI) => {
    try {
      const token = fakeToken();
      const response = await axios.post(API_USERS_URL, {
        ...userData,
        token: token,
      });
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.errors);
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (userData, thunkAPI) => {
    try {
      const response1 = await axios.post(API_LOGIN_URL, userData);

      const newToken = response1.data.token;
      const response2 = await axios.put(`${API_USERS_URL}/1`, {
        token: newToken,
      });
      const response2Admin = { ...response2.data, role: "admin" };
      return response2Admin;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.errors);
    }
  }
);

export const getCurrentUser = createAsyncThunk(
  "auth/getCurrentUser",
  async (_, thunkAPI) => {
    try {
      const token = localStorage.getItem("accessToken") ?? "";
      if (!token) {
        throw new Error("Không tìm thấy token.");
      }
      const response = await axios.get(API_USERS_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // const response2 = await fetch("https://dummyjson.com/auth/me", {
      //   method: "GET",
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //   },
      // });
      // const data1 = response1.data.find((user) => user.token === token);
      // const data2 = await response2.json();
      // if (data1) {
      //   return data1;
      // } else return data2;

      return response.data.find((user) => user.token === token);
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.errors || err.message
      );
    }
  }
);

// export const getCurrentUser = createAsyncThunk(
//   "auth/getCurrentUser",
//   async (_, thunkAPI) => {
//     try {
//       const token = localStorage.getItem("accessToken") ?? "";
//       if (!token) {
//         throw new Error("Không tìm thấy token.");
//       }
//       const response = await fetch("https://dummyjson.com/auth/me", {
//         method: "GET",
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       const data = await response.json();
//       return data;
//     } catch (err) {
//       return thunkAPI.rejectWithValue(
//         err.response?.data?.errors || err.message
//       );
//     }
//   }
// );

export const logout = createAsyncThunk("auth/logout", async () => {
  localStorage.removeItem("accessToken");
});

export const updateUserProfile = createAsyncThunk(
  "auth/updateUserProfile",
  async (updatedData, thunkAPI) => {
    try {
      const response = await axios.put(
        `${API_USERS_URL}/${updatedData.id}`,
        updatedData
      );

      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.errors || err.message
      );
    }
  }
);

export const addToCart = createAsyncThunk(
  "auth/addToCart",
  async (updatedData, thunkAPI) => {
    try {
      const response = await axios.put(
        `${API_USERS_URL}/${updatedData.id}`,
        updatedData
      );

      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.errors || err.message
      );
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(register.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(register.fulfilled, (state, action) => {
      state.isLoading = false;
      state.currentUser = action.payload;
      // state.currentUser = action.meta.arg.username;
    });
    builder.addCase(register.rejected, (state, action) => {
      state.isLoading = false;
    });

    builder.addCase(login.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.isLoading = false;
      state.currentUser = action.payload;
      // state.currentUser = action.meta.arg.username;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.isLoading = false;
    });

    builder.addCase(getCurrentUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getCurrentUser.fulfilled, (state, action) => {
      state.isLoading = false;

      state.currentUser = action.payload;
    });
    builder.addCase(getCurrentUser.rejected, (state, action) => {
      state.isLoading = false;
      state.currentUser = null;
    });
    builder.addCase(updateUserProfile.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateUserProfile.fulfilled, (state, action) => {
      state.isLoading = false;
      state.currentUser = action.payload;
    });
    builder.addCase(updateUserProfile.rejected, (state, action) => {
      state.isLoading = false;
      state.currentUser = null;
    });
    builder.addCase(addToCart.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(addToCart.fulfilled, (state, action) => {
      state.isLoading = false;
      state.currentUser = action.payload;
    });
    builder.addCase(addToCart.rejected, (state, action) => {
      state.isLoading = false;
      state.currentUser = null;
    });
    builder.addCase(logout.fulfilled, (state, action) => {
      state.isLoading = false;
      state.currentUser = null;
    });
  },
});

const fakeToken = () => {
  return Math.random().toString(36).substring(2);
};

export default authSlice.reducer;
