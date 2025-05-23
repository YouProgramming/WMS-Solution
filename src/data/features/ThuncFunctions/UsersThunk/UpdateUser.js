import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const updateUser = createAsyncThunk(
  'account/updateUser',
  async (user, { rejectWithValue }) => {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            return rejectWithValue('No token found');
        }
      const response = await axios.put(
        'http://localhost:5062/api/ManageUsers/UpdateUser',
        user,
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

export default updateUser;