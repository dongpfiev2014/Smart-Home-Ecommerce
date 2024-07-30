import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import bcrypt from "bcryptjs";

const initialState = {
  currentUser: undefined,
  isLoading: false,
  success: false,
};

const API_USERS_URL = "https://6623cafa3e17a3ac8470401a.mockapi.io/api/users";
const API_AUTHEN_URL = "https://6623cafa3e17a3ac8470401a.mockapi.io/api/authen";

export const register = createAsyncThunk(
  "auth/register",
  async (userData, thunkAPI) => {
    try {
      const { username, password, email } = userData;

      const allUser = await axios.get(API_AUTHEN_URL);
      const userExist = allUser.data.find(
        (user) => user.email === email || user.username === username
      );

      if (userExist === undefined) {
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        const responseAuthen = await axios.post(API_AUTHEN_URL, {
          username,
          password: hashPassword,
          email,
        });

        const responseWithoutPass = { ...responseAuthen.data };
        delete responseWithoutPass.password;

        const token = fakeToken();
        const responseUser = await axios.post(API_USERS_URL, {
          ...responseWithoutPass,
          token: token,
        });
        return responseUser.data;
      }
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (userData, thunkAPI) => {
    try {
      const url = new URL(API_AUTHEN_URL);
      url.searchParams.append("username", userData.username);
      const responseAuthen = await axios.get(url);

      if (responseAuthen.data.length === 1) {
        const isMatch = await bcrypt.compare(
          userData.password,
          responseAuthen.data[0].password
        );

        if (isMatch) {
          const token = fakeToken();
          const responseUser = await axios.put(
            `${API_USERS_URL}/${responseAuthen.data[0].id}`,
            { token: token }
          );
          return responseUser.data;
        }
      }
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

      return response.data.find((user) => user.token === token);
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.errors || err.message
      );
    }
  }
);

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
      state.success = false;
    });
    builder.addCase(register.fulfilled, (state, action) => {
      state.isLoading = false;
      state.currentUser = action.payload;
      state.success = true;
    });
    builder.addCase(register.rejected, (state, action) => {
      state.isLoading = false;
      state.success = false;
    });

    builder.addCase(login.pending, (state) => {
      state.isLoading = true;
      state.success = false;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.isLoading = false;
      state.currentUser = action.payload;
      state.success = true;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.isLoading = false;
      state.success = false;
    });

    builder.addCase(getCurrentUser.pending, (state) => {
      state.isLoading = true;
      state.success = false;
    });
    builder.addCase(getCurrentUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.currentUser = action.payload;
      state.success = true;
    });
    builder.addCase(getCurrentUser.rejected, (state, action) => {
      state.isLoading = false;
      state.currentUser = null;
      state.success = false;
    });
    builder.addCase(updateUserProfile.pending, (state) => {
      state.isLoading = true;
      state.success = false;
    });
    builder.addCase(updateUserProfile.fulfilled, (state, action) => {
      state.isLoading = false;
      state.currentUser = action.payload;
      state.success = true;
    });
    builder.addCase(updateUserProfile.rejected, (state, action) => {
      state.isLoading = false;
      state.currentUser = null;
      state.success = false;
    });
    builder.addCase(addToCart.pending, (state) => {
      state.isLoading = true;
      state.success = false;
    });
    builder.addCase(addToCart.fulfilled, (state, action) => {
      state.isLoading = false;
      state.currentUser = action.payload;
      state.success = true;
    });
    builder.addCase(addToCart.rejected, (state, action) => {
      state.isLoading = false;
      state.currentUser = null;
      state.success = false;
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
