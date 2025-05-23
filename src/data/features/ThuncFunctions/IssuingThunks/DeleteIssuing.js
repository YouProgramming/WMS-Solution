import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const deleteIssuing = createAsyncThunk(
    'issuings/deleteIssuing',
    async (issuingId, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                return rejectWithValue('No token found');
            }
            const response = await axios.delete(
                `http://localhost:5062/api/Issuing/DeleteIssuing/${issuingId}`,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    },
                    withCredentials: true
                }
            );
            return {issuingId};
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Something went wrong"
            );
        }
    }
);

export default deleteIssuing;