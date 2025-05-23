import { createSlice } from "@reduxjs/toolkit";
import {getAllStockMovmentsThunk} from "../ThuncFunctions/StockMovmentThunks/StockMovmentThunk.js";
const initialState = {
    stockMovments: [],
    loading: false,
    error: null,
};
const stockMovmentSlice = createSlice({
    name: 'stockMovments',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllStockMovmentsThunk.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        builder.addCase(getAllStockMovmentsThunk.fulfilled, (state, action) => {
            state.loading = false;
            state.stockMovments = action.payload;
        })
        builder.addCase(getAllStockMovmentsThunk.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })
    }
});
export default stockMovmentSlice.reducer;
