import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const addReceiving = createAsyncThunk(
  'receiving/add',
  async (receivingData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        return rejectWithValue('No token found');
      }
      const response = await axios.post(
        'http://localhost:5062/api/Receiving/AddReceiving',
        receivingData,
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

export default addReceiving;
