import { createSlice } from '@reduxjs/toolkit'
import { userLocalStorage } from '../services/LocalService';

const initialState = {
  userInfo: userLocalStorage.get(),
}

const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    setLogin: (state, action) => { 
      state.userInfo = action.payload
    }
  }
});

export const { setLogin } = userSlice.actions

export default userSlice.reducer