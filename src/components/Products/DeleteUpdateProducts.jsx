import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import { useState } from "react";
import { Link } from 'react-router';
// Dialog
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import {getAllProductsThunk as getAllProducts} from '../../data/features/ThuncFunctions/ProductThunks/getAllProductsThunk.js';
import {deleteProductThunk as deleteProduct} from '../../data/features/ThuncFunctions/ProductThunks/deleteProductThunk.js';

export default function DeleteUpdateProducts({ isUpdate }) {
    const [open, setOpen] = useState(false);
    const [productId, setProductId] = useState(null);
    const dispatch = useDispatch();
    const products = useSelector((state) => state.products.products);
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        dispatch(getAllProducts());
    }, [dispatch, refresh]);

    useEffect(() => {
        const mainContent = document.querySelector('.Main-content-container');
        if (open) {
            mainContent?.setAttribute('inert', 'true');
        } else {
            mainContent?.removeAttribute('inert');
        }
        return () => {
            mainContent?.removeAttribute('inert');
        };
    }, [open]);

    const handleDialogOpen = (id) => {
        setOpen(true);
        setProductId(id);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDelete = () => {
        dispatch(deleteProduct(productId));
        setOpen(false);
        setRefresh(!refresh);
    };

    return (
        <div className="Main-content-container">
            <table className="product-table">
                <caption>{isUpdate ? 'Update' : 'Delete'} a Product</caption>
                <thead>
                    <tr>
                        <th>Product ID</th>
                        <th>Product Name</th>
                        <th>Quantity In Stock</th>
                        <th>Unit Price</th>
                        <th>Total Price</th>
                        <th>Last Restocked</th>
                        <th>{isUpdate ? 'Update' : 'Delete'}</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product.productId}>
                            <td>{product.productId}</td>
                            <td>{product.productName}</td>
                            <td>{product.quantityInStock}</td>
                            <td>${product.unitPrice}</td>
                            <td>${product.totalPrice}</td>
                            <td>{product.lastRestocked ?? '-'}</td>
                            <td>
                                {isUpdate ? (
                                    <Link
                                        to={`/products/${product.productId}/edit`}
                                        style={{ color: '#25f748' }}
                                    >
                                        <EditIcon className="table-btn" />
                                    </Link>
                                ) : (
                                    <button
                                        className="table-btn"
                                        style={{ color: '#f44336' }}
                                        onClick={() => handleDialogOpen(product.productId)}
                                    >
                                        <DeleteForeverIcon />
                                    </button>
                                )}
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
                slotProps={{
                    paper: {
                        sx: {
                            backgroundColor: '#2e2e2e',
                        },
                    },
                }}
            >
                <DialogTitle id="alert-dialog-title" color="white" fontWeight={900}>
                    {`Delete Product With ID: ${productId}`}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText
                        id="alert-dialog-description"
                        color="white"
                        fontWeight={900}
                    >
                        {`Are you sure you want to delete Product With ID: ${productId}?`}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleDelete}>Delete</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}