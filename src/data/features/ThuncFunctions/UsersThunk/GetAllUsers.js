import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const getAllUsers = createAsyncThunk(
  'account/getAllUsers',
  async (_, { rejectWithValue }) => {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            return rejectWithValue('No token found');
        }
      const response = await axios.get(
        'http://localhost:5062/api/ManageUsers/user',
        {
          headers: {
            'Authorization': `Bearer ${token}`
          },
          withCredentials: true
        }
      );
      return {users: response.data.result};
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Something went wrong"
      );
    }
  }
);

export default getAllUsers;