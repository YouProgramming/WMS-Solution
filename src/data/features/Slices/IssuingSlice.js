import { createSlice } from '@reduxjs/toolkit';
import addNewIssuing from '../ThuncFunctions/IssuingThunks/AddNewIssuing.js';
import deleteIssuing from '../ThuncFunctions/IssuingThunks/DeleteIssuing.js';
import getIssuingById from '../ThuncFunctions/IssuingThunks/GetIssuingById.js';
import updateIssuing from '../ThuncFunctions/IssuingThunks/UpdateIssuing.js';
import getAllIssuings from '../ThuncFunctions/IssuingThunks/GetAllIssuings.js';
const IssuingSlice = createSlice({
    name: 'issuings',
    initialState:{
        issuings:[],
        issuing:null,
        loading:false,
        error:null
    },
    reducers:{},
    extraReducers: (builder) => {
       builder.addCase(getAllIssuings.pending, (state) => {
        state.loading = true;
       })
       builder.addCase(getAllIssuings.fulfilled, (state, action) => {
        state.issuings = action.payload.issuings;
       })
       builder.addCase(getAllIssuings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
       })
       builder.addCase(getIssuingById.pending, (state) => {
        state.loading = true;
       })
       builder.addCase(getIssuingById.fulfilled, (state, action) => {
        state.issuing = action.payload.issuing;
        state.loading = false;
       })
       builder.addCase(getIssuingById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
       })
       builder.addCase(updateIssuing.pending, (state) => {
        state.loading = true;
       })
       builder.addCase(updateIssuing.fulfilled, (state) => {
        state.loading = false;
       })
       builder.addCase(updateIssuing.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
       })
       builder.addCase(addNewIssuing.pending, (state) => {
        state.loading = true;
       })
       builder.addCase(addNewIssuing.fulfilled, (state) => {
        state.loading = false;
       })
       builder.addCase(addNewIssuing.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
       })
       builder.addCase(deleteIssuing.pending, (state) => {
        state.loading = true;
       })
       builder.addCase(deleteIssuing.fulfilled, (state) => {
        state.loading = false;
       })
       builder.addCase(deleteIssuing.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
       })
    }
})
export default IssuingSlice.reducer;
