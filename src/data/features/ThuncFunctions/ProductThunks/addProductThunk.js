import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const addProductThunk = createAsyncThunk(
  'products/addProduct',
  async (productData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        return rejectWithValue('No token found');
      }
      const response = await axios.post(
        'http://localhost:5062/api/Products/AddProduct',
        productData,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          },
          withCredentials: true
        }
      );
      return response.data.Id;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
