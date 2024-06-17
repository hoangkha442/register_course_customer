// slices/userSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { userLocalStorage } from '../services/LocalService';

const initialState = {
  userInfo: userLocalStorage.get() || null, // Ensure it's not undefined
};

const userSlice = createSlice({
  name: 'user', // Match this name with the key in the store
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.userInfo = action.payload;
    },
  },
});

export const { setLogin } = userSlice.actions;
export default userSlice.reducer;
