import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import addReceiving from '../ThuncFunctions/RecievingThunks/addReceivingThunk';
import updateReceiving from '../ThuncFunctions/RecievingThunks/updateReceivingThunk';
import getAllReceivings from '../ThuncFunctions/RecievingThunks/getAllReceivingsThunk';
import getReceivingById from '../ThuncFunctions/RecievingThunks/getReceivingByIdThunk';
import deleteReceiving from '../ThuncFunctions/RecievingThunks/deleteReceivingThunk';

const initialState = {
  receivings: [],
  receiving: null,
  loading: false,
  error: null,
  message: null,
};

const receivingsSlice = createSlice({
  name: 'receivings',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Add Receiving
    builder.addCase(addReceiving.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(addReceiving.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
    });
    builder.addCase(addReceiving.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload?.message || 'Failed to add receiving';
    });

    // Update Receiving
    builder.addCase(updateReceiving.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updateReceiving.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
    });
    builder.addCase(updateReceiving.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload?.message || 'Failed to update receiving';
    });

    // Get All Receivings
    builder.addCase(getAllReceivings.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getAllReceivings.fulfilled, (state, action) => {
      state.loading = false;
      state.receivings = action.payload.receivings;
    });
    builder.addCase(getAllReceivings.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload?.message || 'Failed to fetch receivings';
    });

    // Get Receiving by ID
    builder.addCase(getReceivingById.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getReceivingById.fulfilled, (state, action) => {
      state.loading = false;
      state.receiving = action.payload.receiving;
    });
    builder.addCase(getReceivingById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload?.message || 'Failed to fetch receiving';
    });

    // Delete Receiving
    builder.addCase(deleteReceiving.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(deleteReceiving.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload.Message;
    });
    builder.addCase(deleteReceiving.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload?.message || 'Failed to delete receiving';
    });
  },
});

export default receivingsSlice.reducer;