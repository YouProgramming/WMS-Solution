import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const updateReceiving = createAsyncThunk(
  'receiving/update',
  async (updateData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        return rejectWithValue('No token found');
      }
      const response = await axios.put(
        'http://localhost:5062/api/Receiving/UpdateReceiving',
        updateData,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          },
          withCredentials: true
        }
      );
      return { message: response.data.Message };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Something went wrong"
      );
    }
  }
);

export default updateReceiving;
