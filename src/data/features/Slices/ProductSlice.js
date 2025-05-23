import { createSlice } from "@reduxjs/toolkit";
import {addProductThunk} from "../ThuncFunctions/ProductThunks/addProductThunk.js";
import {deleteProductThunk} from "../ThuncFunctions/ProductThunks/deleteProductThunk.js";
import {getAllProductsThunk} from "../ThuncFunctions/ProductThunks/getAllProductsThunk.js";
import {getProductByIdThunk} from "../ThuncFunctions/ProductThunks/getProductByIdThunk.js";
import {updateProductThunk} from "../ThuncFunctions/ProductThunks/updateProductThunk.js";

const initialState = {
    products: [],
    loading: false,
    error: null,
    selectedProduct: null,
    addedProductId: null,
    Message: null,
};

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllProductsThunk.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(getAllProductsThunk.fulfilled, (state, action) => {
            state.products = action.payload;
            state.loading = false;
        });
        builder.addCase(getAllProductsThunk.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        builder.addCase(getProductByIdThunk.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(getProductByIdThunk.fulfilled, (state, action) => {
            state.selectedProduct = action.payload;
            state.loading = false;
        });
        builder.addCase(getProductByIdThunk.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        builder.addCase(addProductThunk.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(addProductThunk.fulfilled, (state, action) => {
            state.addedProductId = action.payload;
            state.loading = false;
        });
        builder.addCase(addProductThunk.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        builder.addCase(updateProductThunk.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(updateProductThunk.fulfilled, (state, action) => {
            state.Message = action.payload;
            state.selectedProduct = null;
            state.loading = false;
        });
        builder.addCase(updateProductThunk.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        builder.addCase(deleteProductThunk.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(deleteProductThunk.fulfilled, (state, action) => {
            state.Message = action.payload;
            state.loading = false;
        });
        builder.addCase(deleteProductThunk.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    },
});

export default productSlice.reducer;
