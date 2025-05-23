import { createSlice } from '@reduxjs/toolkit';
import login from '../ThuncFunctions/UsersThunk/Login.js';
import getAllUsers from '../ThuncFunctions/UsersThunk/GetAllUsers.js';
import deleteUser from '../ThuncFunctions/UsersThunk/DeleteUser.js';
import updateUser from '../ThuncFunctions/UsersThunk/UpdateUser.js';     
import addNewUser from '../ThuncFunctions/UsersThunk/AddNewUser.js';
const initialState = {
    users: [],  
    user: null,  
    currentUser: null,       
    token: null,
    isAuthenticated: false,
    loading: false,
    error: null,
};

const UserSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        logout: (state) => {
            state.token = null;
            state.isAuthenticated = false;
            state.currentUser = null;
            state.loading = false;
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;  
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.token = action.payload.token;
                state.isAuthenticated = true;
                state.currentUser = action.payload.user;
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Something went wrong';
            });
        builder
            .addCase(getAllUsers.pending, (state) => {
                state.loading = true;
                state.error = null;  
            })
            .addCase(getAllUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload.users;
            })
            .addCase(getAllUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Something went wrong';
            });
        builder
            .addCase(deleteUser.pending, (state) => {
                state.loading = true;
                state.error = null;  
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload.users;
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Something went wrong';
            });
        builder
            .addCase(updateUser.pending, (state) => {
                state.loading = true;
                state.error = null;  
            })
            .addCase(updateUser.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Something went wrong';
            });
        builder
            .addCase(addNewUser.pending, (state) => {
                state.loading = true;
                state.error = null;  
            })
            .addCase(addNewUser.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(addNewUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Something went wrong';
            });
    },
});

export const { logout } = UserSlice.actions;
export default UserSlice.reducer;
