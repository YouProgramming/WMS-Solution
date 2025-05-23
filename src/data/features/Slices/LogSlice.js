import { createSlice } from '@reduxjs/toolkit';
import getAllLogs from '../ThuncFunctions/LogsThunk/GetAllLogs.js';
import getLogById from '../ThuncFunctions/LogsThunk/GetLogById.js';
const LogSlice = createSlice({
    name: 'logs',
    initialState:{
        logs:[],
        log:null,
        loading:false,
        error:null
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(getAllLogs.pending,(state)=>{
            state.loading=true;
        })
        .addCase(getAllLogs.fulfilled,(state,action)=>{
            state.loading=false;
            state.logs=action.payload.logs;
        })
        .addCase(getAllLogs.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        })
        .addCase(getLogById.pending,(state)=>{
            state.loading=true;
        })
        .addCase(getLogById.fulfilled,(state,action)=>{
            state.loading=false;
            state.log=action.payload.log;
        })
        .addCase(getLogById.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        })
    }
});

export default LogSlice.reducer;