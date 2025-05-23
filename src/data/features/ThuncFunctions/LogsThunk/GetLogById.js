import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const getLogById = createAsyncThunk(
    'logs/getLogById',
    async (logId, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                return rejectWithValue('No token found');
            }
            const response = await axios.get(
                `http://localhost:5062/api/Log/${logId}`,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    },
                    withCredentials: true
                }
            );
            return {log: response.data.result};
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Something went wrong"
            );
        }
    }
);

export default getLogById;