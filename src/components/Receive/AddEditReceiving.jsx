import PageTitle from "../AllScreensComponents/PageTtitle";
import Grid from '@mui/material/Grid';
import React, { useState } from 'react';
import "../Products/AddEditProduc.css"
// Fetch Data
import { useDispatch, useSelector } from "react-redux";
import getReceivingById from "../../data/features/ThuncFunctions/RecievingThunks/getReceivingByIdThunk";
import updateReceiving from "../../data/features/ThuncFunctions/RecievingThunks/updateReceivingThunk";
import addReceiving from "../../data/features/ThuncFunctions/RecievingThunks/addReceivingThunk";
import { useEffect } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router";

export default function AddEditReceiving({isUpdate}){
    const dispatch = useDispatch();
    const receiving = useSelector((state) => state.receivings.receiving);
    let receivingId = null;
    if(isUpdate){
      receivingId = useParams().receivingId;
    }
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        ReceiveId: '0',
        QuantityReceived: '',
        ReceiveDate: '',
        ProductID: '',
      });
    

    useEffect(() => {
        if(receivingId && isUpdate){
          dispatch(getReceivingById(receivingId));
        }
      }, [dispatch,receivingId,isUpdate]);

      useEffect(() => {
        if(receiving && isUpdate){
          setFormData({
            ReceiveId: receiving.receiveId,
            QuantityReceived: receiving.quantityReceived,
            ReceiveDate: receiving.receiveDate,
            ProductID: receiving.productId,
          });
        }
      }, [receiving,isUpdate]);
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        if(isUpdate){
          const response = await dispatch(updateReceiving(formData));
          if(response.meta.requestStatus === "fulfilled"){
            navigate("/receive");
          }
        }else{
          const response = await dispatch(addReceiving(formData));
          if(response.meta.requestStatus === "fulfilled"){
            navigate("/receive");
          }
        }
    };
    
    return (
        <div className="Main-content-container" style={{width: "fit-content"}}>
            {/* <PageHeader/> */}
            <PageTitle Title={isUpdate ? "Update Receiving" : "Add New Receiving"} SubeTitle={""}/>
            <Grid container gap={"35px"} marginY={"15px"}>
                <Grid height={"350px"} display={"flex"} alignItems={"center"} paddingLeft={"20px"} justifyContent={"center"}>
                   <form onSubmit={handleSubmit} className="add-update-product-form" style={{flexDirection:"column"}}>
                        <div className="form-group">
                            <label htmlFor="ReceiveId">Receive ID:</label>
                            <input
                            type="text"
                            id="ReceiveId"
                            name="ReceiveId"
                            onChange={handleChange}
                            value={formData.ReceiveId}
                            readOnly
                            />
                        </div>
                        
                        <div className="form-group">
                            <label htmlFor="QuantityReceived">Quantity Received:</label>
                            <input
                            type="number"
                            id="QuantityReceived"
                            name="QuantityReceived"
                            onChange={handleChange}
                            value={formData.QuantityReceived}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="ReceiveDate">Receive Date:</label>
                            <input
                            type="date"
                            id="ReceiveDate"
                            name="ReceiveDate"
                            onChange={handleChange}
                            value={formData.ReceiveDate}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="ProductID">Product ID:</label>
                            <input
                            type="number"
                            id="ProductID"
                            name="ProductID"
                            onChange={handleChange}
                            value={formData.ProductID}
                            />
                        </div>
                        <div className="form-group">
                            <button type="submit" className="submit-btn">Submit</button>
                        </div>
                   </form>
                </Grid>
            </Grid>
        </div>
    )
}