import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getAllStockMovmentsThunk = createAsyncThunk(
  'stockMovments/getAllStockMovments',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        return rejectWithValue('No token found');
      }
      const response = await axios.get(
        'http://localhost:5062/api/Reports/StockMovementReport',
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