import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const updateIssuing = createAsyncThunk(
    'issuings/updateIssuing',
    async (issuing, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                return rejectWithValue('No token found');
            }
            const response = await axios.put(
                `http://localhost:5062/api/Issuing/UpdateIssuing`,
                issuing,
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

export default updateIssuing;