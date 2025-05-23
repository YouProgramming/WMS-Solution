import PageTitle from "../AllScreensComponents/PageTtitle";
import Grid from '@mui/material/Grid';
import React, { useState, useEffect } from 'react';
import "../Products/AddEditProduc.css";

// Fetch Data
import { useDispatch, useSelector } from "react-redux";
import getIssuingById from "../../data/features/ThuncFunctions/IssuingThunks/GetIssuingById.js";
import updateIssuing from "../../data/features/ThuncFunctions/IssuingThunks/UpdateIssuing.js";
import addNewIssuing from "../../data/features/ThuncFunctions/IssuingThunks/AddNewIssuing.js";
import { useParams } from "react-router";
import { useNavigate } from "react-router";
export default function AddEditIssue({isUpdate}){
    
    const issuing = useSelector((state) => state.issuings.issuing);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {issueId} = useParams();

    useEffect(() => {
        if (isUpdate && issueId) {
            dispatch(getIssuingById(issueId));
        }
    }, [dispatch, isUpdate, issueId]);
    

    const [formData, setFormData] = useState({
        issueId: '0',
        quantityIssued: '',
        issueDate: '',
        productId: '',
      });

      useEffect(() => {
        if (isUpdate && issuing) {
            setFormData({
                issueId: issuing.issueId || '',
                quantityIssued: issuing.quantityIssued || '',
                issueDate: issuing.issueDate || '',
                productId: issuing.productId || '',
            });
        }
    }, [issuing, isUpdate]);
    
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
            const response = await dispatch(updateIssuing(formData));
            if(response.meta.requestStatus === "fulfilled"){
                navigate("/issue");
            }
        }else{
            const response = await dispatch(addNewIssuing(formData));
            if(response.meta.requestStatus === "fulfilled"){
                navigate("/issue");
            }
            
        }
    };
    
    return (
        <div className="Main-content-container" style={{width: "fit-content"}}>
            {/* <PageHeader/> */}
            <PageTitle Title={isUpdate ? "Add New Issue" : "Update Issue"} SubeTitle={""}/>
            <Grid container gap={"35px"} marginY={"15px"}>
                <Grid height={"350px"} display={"flex"} alignItems={"center"} paddingLeft={"20px"} justifyContent={"center"}>
                   <form onSubmit={handleSubmit} className="add-update-product-form" style={{flexDirection:"column"}}>
                        <div className="form-group">
                            <label htmlFor="issueId">Issue ID:</label>
                            <input
                            type="text"
                            id="issueId"
                            name="issueId"
                            onChange={handleChange}
                            value={formData.issueId}
                            readOnly
                            />
                        </div>
                        
                        <div className="form-group">
                            <label htmlFor="quantityIssued">Quantity Issued:</label>
                            <input
                            type="number"
                            id="quantityIssued"
                            name="quantityIssued"
                            onChange={handleChange}
                            value={formData.quantityIssued}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="issueDate">Issue Date:</label>
                            <input
                            type="date"
                            id="issueDate"
                            name="issueDate"
                            onChange={handleChange}
                            value={formData.issueDate}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="productId">Product ID:</label>
                            <input
                            type="number"
                            id="productId"
                            name="productId"
                            onChange={handleChange}
                            value={formData.productId}
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