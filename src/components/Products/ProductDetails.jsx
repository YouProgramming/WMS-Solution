import React, { useState } from 'react';
import { Grid } from '@mui/material';
import PageTitle from '../AllScreensComponents/PageTtitle';
import ProfilePicture from '../../assets/ProfilePicture.jpg'; // adjust this import path as needed
import "./Products.css"
export default function ProductDetails(){
    const [ProductData] = useState({
        ProductId: '1',
        ProductName: 'Sample Product',
        Description: 'This is a sample product.',
        UnitPrice: '$10.00',
        QuantityInStock: '100',
        Category: 'Clothes',
        imageSrc: 'sample.jpg'
    });

    return (
        <div className="Main-content-container">
            <PageTitle Title="Product Details" SubeTitle="" />
            <Grid container gap={"35px"} marginY={"15px"}>
                <Grid
                    bgcolor={"#2e2e2e"}
                    size={{ xs: 12, sm: 4 }}
                    className="image-upload-grid"
                    container
                    justifyContent="center"
                    alignItems="center"
                >
                    <img src={ProfilePicture} alt="Product Pic" className="Product-image" />
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }} height={"350px"} display={"flex"} alignItems={"center"} paddingLeft={"20px"}>
                    <div className="product-details-display">
                        <div className="detail-group"><strong>Product ID:</strong> {ProductData.ProductId}</div>
                        <div className="detail-group"><strong>Product Name:</strong> {ProductData.ProductName}</div>
                        <div className="detail-group"><strong>Description:</strong> {ProductData.Description}</div>
                        <div className="detail-group"><strong>Unit Price:</strong> {ProductData.UnitPrice}</div>
                        <div className="detail-group"><strong>Quantity In Stock:</strong> {ProductData.QuantityInStock}</div>
                        <div className="detail-group"><strong>Category:</strong> {ProductData.Category}</div>
                    </div>
                </Grid>
            </Grid>
        </div>
    );
}