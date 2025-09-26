import { createSlice } from '@reduxjs/toolkit'
import Cookies from 'js-cookie'

interface AuthState {
  isAuthenticated: boolean
}

const initialState: AuthState = {
  isAuthenticated: !!Cookies.get('auth_token'),
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state) => {
      state.isAuthenticated = true
    },
    logout: (state) => {
      state.isAuthenticated = false
    },
  },
})

export const { login, logout } = authSlice.actions
export default authSlice.reducer