import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const getReceivingById = createAsyncThunk(
  'receiving/getById',
  async (id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        return rejectWithValue('No token found');
      }
      const response = await axios.get(
        `http://localhost:5062/api/Receiving/${id}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          },
          withCredentials: true
        }
      );
      return { receiving: response.data.result };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Something went wrong"
      );
    }
  }
);

export default getReceivingById;
