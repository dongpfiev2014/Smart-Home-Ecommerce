import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

/** Đây là reducer cho phần post Contents */
/** Đây là reducer cho phần post Contents */
/** Đây là reducer cho phần post Contents */
/** Đây là reducer cho phần post Contents */

const initialContentsState = {
  contents: undefined,
  isLoading: false,
};

const API_CONTENTS_URL =
  "https://6629493254afcabd0738d945.mockapi.io/api/contents";

export const publishContent = createAsyncThunk(
  "contents/publish",
  async (postData, thunkAPI) => {
    try {
      const response = await axios.post(API_CONTENTS_URL, postData);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.errors || err.message
      );
    }
  }
);
export const getContent = createAsyncThunk(
  "contents/get",
  async ({ category }, thunkAPI) => {
    try {
      const response = await axios.get(
        `${API_CONTENTS_URL}/?category=${category}`
      );
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.errors || err.message
      );
    }
  }
);

export const getIdContent = createAsyncThunk(
  "contents/getId",
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(`${API_CONTENTS_URL}/${id}`);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.errors || err.message
      );
    }
  }
);

export const getAllContents = createAsyncThunk(
  "contents/getAllContents",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(API_CONTENTS_URL);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.errors || err.message
      );
    }
  }
);

export const deleteContent = createAsyncThunk(
  "contents/delete",
  async (id, thunkAPI) => {
    try {
      const response = await axios.delete(`${API_CONTENTS_URL}/${id}`);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.errors || err.message
      );
    }
  }
);

export const editContent = createAsyncThunk(
  "contents/edit",
  async (data, thunkAPI) => {
    try {
      const response = await axios.put(`${API_CONTENTS_URL}/${data.id}`, data);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.errors || err.message
      );
    }
  }
);

const contentsSlice = createSlice({
  name: "contents",
  initialState: initialContentsState,
  extraReducers: (builder) => {
    builder.addCase(publishContent.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(publishContent.fulfilled, (state, action) => {
      state.isLoading = false;
      state.contents = action.payload;
    });
    builder.addCase(publishContent.rejected, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(getContent.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getContent.fulfilled, (state, action) => {
      state.isLoading = false;
      state.contents = action.payload;
    });
    builder.addCase(getContent.rejected, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(getAllContents.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAllContents.fulfilled, (state, action) => {
      state.isLoading = false;
      state.contents = action.payload;
    });
    builder.addCase(getAllContents.rejected, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(deleteContent.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteContent.fulfilled, (state, action) => {
      state.isLoading = false;
      state.contents = action.payload;
    });
    builder.addCase(deleteContent.rejected, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(editContent.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(editContent.fulfilled, (state, action) => {
      state.isLoading = false;
      state.contents = action.payload;
    });
    builder.addCase(editContent.rejected, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(getIdContent.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getIdContent.fulfilled, (state, action) => {
      state.isLoading = false;
      state.contents = action.payload;
    });
    builder.addCase(getIdContent.rejected, (state, action) => {
      state.isLoading = false;
    });
  },
});

export const contentsReducer = contentsSlice.reducer;

/** Đây là reducer cho phần post Products */
/** Đây là reducer cho phần post Products */
/** Đây là reducer cho phần post Products */
/** Đây là reducer cho phần post Products */

const initialProductsState = {
  products: undefined,
  isLoading: false,
};

const API_PRODUCTS_URL =
  "https://6629493254afcabd0738d945.mockapi.io/api/products";

export const publishProduct = createAsyncThunk(
  "products/publish",
  async (postData, thunkAPI) => {
    try {
      const response = await axios.post(API_PRODUCTS_URL, postData);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.errors || err.message
      );
    }
  }
);

export const getProduct = createAsyncThunk(
  "products/get",
  async ({ category }, thunkAPI) => {
    try {
      const response = await axios.get(
        `${API_PRODUCTS_URL}/?category=${category}`
      );
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.errors || err.message
      );
    }
  }
);

export const getIdProduct = createAsyncThunk(
  "products/getId",
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(`${API_PRODUCTS_URL}/${id}`);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.errors || err.message
      );
    }
  }
);

export const getAllProducts = createAsyncThunk(
  "products/getAllProducts",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(API_PRODUCTS_URL);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.errors || err.message
      );
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "products/delete",
  async (id, thunkAPI) => {
    try {
      const response = await axios.delete(`${API_PRODUCTS_URL}/${id}`);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.errors || err.message
      );
    }
  }
);

export const editProduct = createAsyncThunk(
  "products/edit",
  async (data, thunkAPI) => {
    try {
      const response = await axios.put(`${API_PRODUCTS_URL}/${data.id}`, data);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.errors || err.message
      );
    }
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState: initialProductsState,
  extraReducers: (builder) => {
    builder.addCase(publishProduct.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(publishProduct.fulfilled, (state, action) => {
      state.isLoading = false;
      state.products = action.payload;
    });
    builder.addCase(publishProduct.rejected, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(getProduct.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getProduct.fulfilled, (state, action) => {
      state.isLoading = false;
      state.products = action.payload;
    });
    builder.addCase(getProduct.rejected, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(getAllProducts.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAllProducts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.products = action.payload;
    });
    builder.addCase(getAllProducts.rejected, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(deleteProduct.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteProduct.fulfilled, (state, action) => {
      state.isLoading = false;
      state.products = action.payload;
    });
    builder.addCase(deleteProduct.rejected, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(editProduct.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(editProduct.fulfilled, (state, action) => {
      state.isLoading = false;
      state.products = action.payload;
    });
    builder.addCase(editProduct.rejected, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(getIdProduct.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getIdProduct.fulfilled, (state, action) => {
      state.isLoading = false;
      state.products = action.payload;
    });
    builder.addCase(getIdProduct.rejected, (state, action) => {
      state.isLoading = false;
    });
  },
});

export const productsReducer = productsSlice.reducer;
