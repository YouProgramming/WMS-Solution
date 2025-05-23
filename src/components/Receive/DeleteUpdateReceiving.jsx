import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import { useState, useRef } from "react";
import { Link } from 'react-router';
import { useNavigate } from "react-router";
// Dialog
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
// Fetch Data
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import getAllReceivings from '../../data/features/ThuncFunctions/RecievingThunks/getAllReceivingsThunk';
import deleteReceiving from '../../data/features/ThuncFunctions/RecievingThunks/deleteReceivingThunk';
export default function DeleteUpdateReceiving({isUpdate}){
    const dispatch = useDispatch();
    const receivings = useSelector((state) => state.receivings.receivings);
    const [open, setOpen] = useState(false);
    const [issueId, setIssueId] = useState(null);
    const navigate = useNavigate();
    
    const handleDialogOpen = (id) => {
        setOpen(true);
        setIssueId(id);
    };

    useEffect(() => {
        dispatch(getAllReceivings());
    }, [dispatch]);

    const handleClose = () => {
        setOpen(false);
    };
    const handleDelete = async() => {
        const result = await dispatch(deleteReceiving(issueId));
        if(result.meta.requestStatus === "fulfilled"){
            setOpen(false);
            setIssueId(null);
            navigate("/receive");
        }
    };
    return (
        <div className="Main-content-container">
            <table className="product-table">
            <caption>{isUpdate ? "Update" : "Delete"} a Receiving Record</caption>
            <thead>
                <tr>
                    <th>Receive ID</th>
                    <th>QuantityReceived</th>
                    <th>ReceiveDate</th>
                    <th>ProductID</th>
                    <th>{isUpdate ? "Update" : "Delete"}</th>
                </tr>
            </thead>
            <tbody>
                {receivings.map((receiving) => (
                <tr key={receiving.receiveId}>
                    <td>{receiving.receiveId}</td>
                    <td>{receiving.quantityReceived}</td>
                    <td>{receiving.receiveDate}</td>
                    <td>{receiving.productId}</td>
                    <td>
                        {
                            isUpdate ? 
                            (<Link to={`/receive/${receiving.receiveId}/edit`} style={{color: "#25f748"}}><EditIcon className={`table-btn`}/></Link>) 
                            :
                            (<button 
                                className={`table-btn`} 
                                style={{color: "#f44336"}} 
                                onClick={() => handleDialogOpen(receiving.receiveId)}
                                aria-label={`Delete receiving record with ID ${receiving.receiveId}`}
                                tabIndex="0"
                            >
                                <DeleteForeverIcon/>
                            </button>)
                        }
                    </td>
                </tr>
            ))}
            </tbody>
            </table>

             <Dialog 
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                role="alertdialog"
                slotProps={{
                    paper: {
                        sx: {
                            backgroundColor: '#2e2e2e', // light blue
                        },
                        tabIndex: -1
                    },
                    backdrop: {
                        inert: true
                    }
                }}
                BackdropProps={{
                    'inert': true
                }}
            >
                <DialogTitle id="alert-dialog-title" color="white" fontWeight={900}>
                    Delete Receiving Record With ID: {issueId}
                </DialogTitle>
                <DialogContent >
                    <DialogContentText 
                        id="alert-dialog-description" 
                        color="white" 
                        fontWeight={900}
                        role="alert"
                    >
                        Are You Sure you want to delete Receiving Record With ID: {issueId}
                    </DialogContentText>
                </DialogContent>
                <DialogActions >
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleDelete} autoFocus>
                    Delete
                </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}