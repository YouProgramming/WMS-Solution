import { useState } from "react";
import PageTitle from "../AllScreensComponents/PageTtitle";
import { Grid } from "@mui/material";
// Fetch Data
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { useEffect } from "react";
import getIssuingById from "../../data/features/ThuncFunctions/IssuingThunks/GetIssuingById.js";
export default function IssueDetails(){
    
    const {issueId} = useParams();
    const dispatch = useDispatch();
    const issuing = useSelector((state) => state.issuings.issuing);
    useEffect(() => {
        if(issueId){
            dispatch(getIssuingById(issueId));
        }
    }, [dispatch, issueId]);

    return (
        <div className="Main-content-container" style={{width: "fit-content"}}>
            {/* <PageHeader/> */}
            <PageTitle Title={"Show Issue Details"} SubeTitle={""}/>
            <Grid container gap={"35px"} marginY={"15px"}>
                <Grid height={"350px"} display={"flex"} alignItems={"center"} paddingLeft={"20px"} justifyContent={"center"}>
                   <div style={{display: 'flex', flexDirection: "column", color: "white", fontWeight: "bold", gap: "35px"}}>
                        <h3>Issue Data</h3>
                        <p><strong>Issue ID:</strong> {issuing?.issueId ?? ""}</p>
                        <p><strong>Quantity Issued:</strong> {issuing?.quantityIssued ?? ""}</p>
                        <p><strong>Issue Date:</strong> {issuing?.issueDate ?? ""}</p>
                        <p><strong>Product ID:</strong> {issuing?.productId ?? ""}</p>
                   </div>
                </Grid>
            </Grid>
        </div>
    )
}