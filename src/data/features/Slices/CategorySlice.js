import { createSlice } from "@reduxjs/toolkit";
import { getAllCategoriesThunk } from "../ThuncFunctions/CategoryThunks/GetAllCategoriesThunk";
const CategorySlice = createSlice({
    name: 'categories',
    initialState:{
        categories:[],
        category:null,
        loading:false,
        error:null
    },
    reducers:{},
    extraReducers: (builder) => {
        builder.addCase(getAllCategoriesThunk.fulfilled, (state, action) => {
            state.categories = action.payload;
        })
        builder.addCase(getAllCategoriesThunk.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        builder.addCase(getAllCategoriesThunk.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
    }
});
export default CategorySlice.reducer;
export const {} = CategorySlice.actions;
