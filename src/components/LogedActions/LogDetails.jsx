import PageTitle from "../AllScreensComponents/PageTtitle";
import { Grid } from "@mui/material";
import { useParams } from "react-router";
import { useEffect } from "react";
import getLogById from "../../data/features/ThuncFunctions/LogsThunk/GetLogById";
import { useDispatch, useSelector } from "react-redux";

export default function LogDetails(){
      const dispatch = useDispatch();
      const log = useSelector((state) => state.logs.log);
      const { logId } = useParams();
      useEffect(() => {
        dispatch(getLogById(logId));
      }, [dispatch, logId]);

    return (
        <div className="Main-content-container" style={{width: "fit-content"}}>
            {/* <PageHeader/> */}
            <PageTitle Title={"Log Details"} SubeTitle={""}/>
            <Grid container gap={"35px"} marginY={"15px"}>
                <Grid height={"350px"} display={"flex"} alignItems={"center"} paddingLeft={"20px"} justifyContent={"center"}>
                   <div style={{display: 'flex', flexDirection: "column", color: "white", fontWeight: "bold", gap: "35px"}}>
                        <h3>Log Data</h3>
                        <p><strong>Log ID:</strong> {log?.logId ?? ""}</p>
                        <p><strong>Action:</strong> {log?.action ?? ""}</p>
                        <p><strong>Time Stamp:</strong> {log?.timeStamp ?? ""}</p>
                        <p><strong>User ID:</strong> {log?.userId ?? ""}</p>
                   </div>
                </Grid>
            </Grid>
        </div>
    )
}