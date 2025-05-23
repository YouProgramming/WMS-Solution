import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const updateProductThunk = createAsyncThunk(
  'products/updateProduct',
  async (productData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        return rejectWithValue('No token found');
      }
      const response = await axios.put(
        'http://localhost:5062/api/Products/UpdateProduct',
        productData,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          },
          withCredentials: true
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
