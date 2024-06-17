import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { UserService } from '../../services/UserService';

// Tạo async thunk để lấy giỏ hàng
export const fetchCartByUserId = createAsyncThunk(
  'cart/fetchCartByUserId',
  async (userId, thunkAPI) => {
    try {
      const response = await UserService.getCartByUserId(userId);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Tạo async thunk để xóa một mục khỏi giỏ hàng
export const deleteCartItem = createAsyncThunk(
  'cart/deleteCartItem',
  async (cartId, thunkAPI) => {
    try {
      await UserService.deleteCartByID(cartId);
      return cartId;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartByUserId.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCartByUserId.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchCartByUserId.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(deleteCartItem.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item.cart_id !== action.payload);
      });
  },
});

export default cartSlice.reducer;
