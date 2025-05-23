import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const login = createAsyncThunk(
  'account/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        'http://localhost:5062/api/Account/Login',
        credentials,
        {
          withCredentials: true
        }
      );
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      return {token: response.data.token, user: response.data.user};
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Username/password invalid"
      );
    }
  }
);

export default login;
  