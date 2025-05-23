import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getProductByIdThunk = createAsyncThunk(
  'products/getProductById',
  async (productId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        return rejectWithValue('No token found');
      }
      const response = await axios.get(
        `http://localhost:5062/api/Products/Id/${productId}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          },
          withCredentials: true
        }
      );
      return response.data.result;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
