import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const addNewUser = createAsyncThunk(
  'account/addNewUser',
  async (FormData, { rejectWithValue }) => {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            return rejectWithValue('No token found');
        }
      const response = await axios.post(
        'http://localhost:5062/api/Account/RegisterUser',
        FormData,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          },
          withCredentials: true
        }
      );
      return {user: response.data.result};
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Something went wrong"
      );
    }
  }
);

export default addNewUser;