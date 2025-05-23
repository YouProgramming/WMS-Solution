import PageTitle from "../AllScreensComponents/PageTtitle"
import { Grid } from "@mui/material";
import { Link } from "react-router";
import ProfilePicture from "../../assets/ProfilePicture.jpg";
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import getAllUsers from "../../data/features/ThuncFunctions/UsersThunk/GetAllUsers.js";
import deleteUser from "../../data/features/ThuncFunctions/UsersThunk/DeleteUser.js";
// Dialog
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import "./Users.css"
export default function Users(){
    const dispatch = useDispatch();
    const {users, error} = useSelector((state) => state.users);

    useEffect(() => {
        dispatch(getAllUsers());
    }, []);

    const [open, setOpen] = useState(false);
    const [username, setUsername] = useState(null);
    const [deleteError, setDeleteError] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);
    
    const handleDialogOpen = (username) => {
        setOpen(true);
        setUsername(username);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDelete = async () => {
        setIsDeleting(true);
        setDeleteError(null);
        
        try {
            const result = await dispatch(deleteUser(username));
            if (result.meta.requestStatus === "fulfilled") {
                dispatch(getAllUsers());
                setOpen(false);
            } else {
                setDeleteError(result.error || "Failed to delete user");
            }
        } catch (error) {
            setDeleteError(error.message || "An error occurred while deleting the user");
        } finally {
            setIsDeleting(false);
        }
    };

    

    return (
        <div className="Main-content-container">
            {/* <PageHeader/> */}
           <div className="Title-and-icon-container">
                <PageTitle Title={"Users"} SubeTitle={"Manage Users here"}/>
                <div>
                    <Link to={"/users/add-new"} className="add-new-link">
                        <PersonAddAlt1Icon className="add-new-icon"/>
                    </Link>
                </div>
            </div>
            <Grid container >
                <Grid size={{xs: 12}}>
                    <div className="user-list">
                        {Array.isArray(users) && users.map(user => {
                            let pfp = user.profilePicturePath !== "" ? 'http://localhost:5062/api/Account/images?relativePath=' + user.profilePicturePath : ProfilePicture;
                            return(
                            <div className="user-item" key={user.username}>
                                <Link to={`/users/${user.username}/account/profile`} className="user-link">
                                <img src={pfp} alt={user.username + " pfp"} className="user-pfp" />
                                <span className="user-name">{user.username}</span>
                                </Link>
                                <div style={{paddingTop: "8px"}}>
                                    <Link to={`/users/${user.username}/account/profile/edit`} className="update">Update</Link> 
                                    <button className="delete" onClick={() => {handleDialogOpen(user.username)}}>Delete</button> 
                                </div>
                            </div>
                        )})}
                    </div>
                </Grid>
            </Grid>

            <Dialog 
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                slotProps={{
                    paper: {
                      sx: {
                        backgroundColor: '#2e2e2e',
                        borderRadius: 2,
                        padding: 2,
                      },
                    },
                  }}
            >
                <DialogTitle id="alert-dialog-title" color="white" fontWeight={900}>
                {"Delete User: " + username}
                </DialogTitle>
                <DialogContent>
                    {isDeleting ? (
                        <DialogContentText color="white" fontWeight={900}>
                            Deleting user...
                        </DialogContentText>
                    ) : (
                        <DialogContentText color="white" fontWeight={900}>
                            {"Are You Sure you want to delete user with Username: " + username}
                        </DialogContentText>
                    )}
                    {deleteError && (
                        <DialogContentText color="red" fontWeight={900}>
                            {deleteError}
                        </DialogContentText>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} disabled={isDeleting}>
                        Cancel
                    </Button>
                    <Button 
                        onClick={handleDelete} 
                        autoFocus
                        disabled={isDeleting}
                        color="error"
                    >
                        {isDeleting ? "Deleting..." : "Delete"}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}