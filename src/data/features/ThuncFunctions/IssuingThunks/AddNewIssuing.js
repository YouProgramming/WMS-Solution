import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const addNewIssuing = createAsyncThunk(
    'issuings/addNewIssuing',
    async (issuing, { rejectWithValue }) => {

        try {
            const token = localStorage.getItem('token');
            if (!token) {
                return rejectWithValue('No token found');
            }
            const response = await axios.post(
                'http://localhost:5062/api/Issuing/AddIssuing',
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

export default addNewIssuing;