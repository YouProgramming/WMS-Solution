import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const deleteReceiving = createAsyncThunk(
  'receiving/delete',
  async (id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        return rejectWithValue('No token found');
      }
      const response = await axios.delete(
        `http://localhost:5062/api/Receiving/DeleteReceiving/${id}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          },
          withCredentials: true
        }
      );
      return { Message: response.data.Message };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Something went wrong"
      );
    }
  }
);

export default deleteReceiving;
