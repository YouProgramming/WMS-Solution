import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const deleteProductThunk = createAsyncThunk(
  'products/deleteProduct',
  async (productId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        return rejectWithValue('No token found');
      }
      const response = await axios.delete(
        `http://localhost:5062/api/Products/DeleteProduct?id=${productId}`,
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
