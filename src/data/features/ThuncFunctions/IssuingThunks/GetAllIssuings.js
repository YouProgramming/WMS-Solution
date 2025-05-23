import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"
const getAllIssuings = createAsyncThunk(
    'issuings/getAllIssuings',
    async (_, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                return rejectWithValue('No token found');
            }
            const response = await axios.get(
                'http://localhost:5062/api/Issuing',
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    },
                    withCredentials: true
                }
            );
            return {issuings: response.data.result};
        } catch (error) {
            return rejectWithValue(
                error.response.data.message || 'Failed to fetch issuings'
            );
        }
    }
);

export default getAllIssuings;