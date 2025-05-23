import PageTitle from "../AllScreensComponents/PageTtitle";
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import "../Products/Products.css";
import { Link } from "react-router";
import { useState } from "react";
import RefreshButton from "../AllScreensComponents/RefreshButton";
// Dialog
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
// Fetch Data
import { useDispatch, useSelector } from 'react-redux';
import getAllIssuings from '../../data/features/ThuncFunctions/IssuingThunks/GetAllIssuings.js';
import deleteIssuing from '../../data/features/ThuncFunctions/IssuingThunks/DeleteIssuing.js';
import { useEffect } from 'react';

export function Issue() {

    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);    
    const [issueId, setIssueId] = useState(null);
    const [refresh, setRefresh] = useState(false);
    const handleDialogOpen = (id) => {
        // Store the current focused element
        const currentFocus = document.activeElement;
        // Open the dialog
        setOpen(true);
        setIssueId(id);
        
        // When dialog closes, restore focus
        return () => {
            if (currentFocus) {
                currentFocus.focus();
            }
        };
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDelete = async() => {
      const response = await dispatch(deleteIssuing(issueId));
      if (response.meta.requestStatus === 'fulfilled') {
        setOpen(false);
        setRefresh(!refresh)
      }
    }

    const issuings = useSelector((state) => state.issuings.issuings);
    useEffect(() => {
        dispatch(getAllIssuings());
    }, [dispatch, refresh]);
    return (
    <div className="Main-content-container">
        {/* <PageHeader/> */}
        <div className="flex-row-small-screen" style={{display: "flex", justifyContent: 'space-between'}}>
          <PageTitle Title={"Issues"} SubeTitle={"Manage Issues here"}/>
          <div className="product-actions flex-row-small-screen">
            <RefreshButton onRefresh={() => {setRefresh(!refresh)}} />
            <Link to="/issue/add-issue" className="action-btn add">Add New Issue</Link>
          </div>
        </div>
        <table className="product-table">
          <caption>Products Issues Summary</caption>
          <thead>
            <tr>
              <th>Issue ID</th>
              <th>QuantityIssued</th>
              <th>IssueDate</th>
              <th>ProductID</th>
              <th>Show</th>
              <th>Delete</th>
              <th>Update</th>
            </tr>
          </thead>
          <tbody>
            {
                issuings.map((issuing) => (
                    <tr key={issuing.issueId}>
                        <td>{issuing.issueId}</td>
                        <td>{issuing.quantityIssued}</td>
                        <td>{issuing.issueDate}</td>
                        <td>{issuing.productId}</td>
                        <td>
                            <Link to={`/issue/${issuing.issueId}/details`}>
                                <VisibilityIcon/>
                            </Link>
                        </td>
                        <td>
                            <button 
                                className={`table-btn`} 
                                style={{color: "#f44336"}} 
                                onClick={() => handleDialogOpen(issuing.issueId)}
                                aria-label={`Delete issuing record with ID ${issuing.issueId}`}
                                tabIndex="0"
                            >
                                <DeleteForeverIcon/>
                            </button>
                        </td>
                        <td>
                            <Link to={`/issue/${issuing.issueId}/edit`} style={{color: "#25f748"}}><EditIcon className={`table-btn`}/></Link>
                        </td>
                    </tr>
                ))
            }
            {/* <tr>
              <td>{1}</td>
              <td>{55}</td>
              <td>{"2022/5/5"}</td>
              <td>{1}</td>
              <td>
                <Link to={"/issue/1/details"}>
                  <VisibilityIcon/>
                </Link>
              </td>
              <td>
                <button className={`table-btn`} style={{color: "#f44336"}} onClick={() => {handleDialogOpen(1)}}><DeleteForeverIcon/></button>
              </td>
              <td>
                <Link to={"/issue/1/edit"} style={{color: "#25f748"}}><EditIcon className={`table-btn`}/></Link>
              </td>
            </tr> */}
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
                }}
                BackdropProps={{
                  'inert': true
              }}
            >
                <DialogTitle id="alert-dialog-title" sx={{ color: 'white', fontWeight: 900 }}>
                    Delete Issuing Record With ID: {issueId}
                </DialogTitle>
                <DialogContent sx={{ color: 'white' }}>
                <DialogContentText id="alert-dialog-description" sx={{ color: 'white', fontWeight: 900 }}>
                    {"Are You Sure you want to delete Issuing Record With ID: " + issueId}
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose} color="inherit">
                    Cancel
                </Button>
                <Button onClick={handleDelete} color="error" variant="contained" autoFocus>
                    Delete
                </Button>
                </DialogActions>
            </Dialog>
      </div>
    );
}