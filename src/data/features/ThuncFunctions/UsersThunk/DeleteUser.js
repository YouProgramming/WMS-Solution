import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const deleteUser = createAsyncThunk(
  'account/deleteUser',
  async (username, { rejectWithValue }) => {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            return rejectWithValue('No token found');
        }
      const response = await axios.delete(
        'http://localhost:5062/api/ManageUsers/DeleteUser/' + username,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          },
          withCredentials: true
        }
      );
      return {result: response.data.result};
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Something went wrong"
      );
    }
  }
);

export default deleteUser;