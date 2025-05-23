import { useState } from "react";
import PageTitle from "../AllScreensComponents/PageTtitle";
import { Grid } from "@mui/material";
// Fetch Data
import { useDispatch, useSelector } from "react-redux";
import getReceivingById from "../../data/features/ThuncFunctions/RecievingThunks/getReceivingByIdThunk";
import { useEffect } from "react";
import { useParams } from "react-router";
export default function ReceivingDetails(){
    const dispatch = useDispatch();
    const receiving = useSelector((state) => state.receivings.receiving);
    const {receivingId} = useParams();

    const [ReceiveData, setReceiveData] = useState({
        ReceiveId: '',
        QuantityReceived: '',
        ReceiveDate: '',
        ProductID: '',
      });
      
      useEffect(() => {
        if(receivingId){
          dispatch(getReceivingById(receivingId));
        }
      }, [dispatch,receivingId]);


    useEffect(() => {
      if(receiving){
        setReceiveData({
          ReceiveId: receiving.receiveId,
          QuantityReceived: receiving.quantityReceived,
          ReceiveDate: receiving.receiveDate,
          ProductID: receiving.productId,
        });
      }
    }, [receiving]);

    

    
    return (
        <div className="Main-content-container" style={{width: "fit-content"}}>
            {/* <PageHeader/> */}
            <PageTitle Title={"Show Receiving Details"} SubeTitle={""}/>
            <Grid container gap={"35px"} marginY={"15px"}>
                <Grid height={"350px"} display={"flex"} alignItems={"center"} paddingLeft={"20px"} justifyContent={"center"}>
                   <div style={{display: 'flex', flexDirection: "column", color: "white", fontWeight: "bold", gap: "35px"}}>
                        <h3>Receive Data</h3>
                        <p><strong>Receive ID:</strong> {ReceiveData.ReceiveId}</p>
                        <p><strong>Quantity Received:</strong> {ReceiveData.QuantityReceived}</p>
                        <p><strong>Receive Date:</strong> {ReceiveData.ReceiveDate}</p>
                        <p><strong>Product ID:</strong> {ReceiveData.ProductID}</p>
                   </div>
                </Grid>
            </Grid>
        </div>
    )
}