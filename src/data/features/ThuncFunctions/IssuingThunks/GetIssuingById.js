import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const getIssuingById = createAsyncThunk(
    'issuings/getIssuingById',
    async (issuingId, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                return rejectWithValue('No token found');
            }
            const response = await axios.get(
                `http://localhost:5062/api/Issuing/${issuingId}`,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    },
                    withCredentials: true
                }
            );
            return {issuing: response.data.result};
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Something went wrong"
            );
        }
    }
);

export default getIssuingById;
