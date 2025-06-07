import PageTitle from "../AllScreensComponents/PageTtitle"
import { Link } from "react-router";
import "../Products/Products.css";
import VisibilityIcon from '@mui/icons-material/Visibility';
import RefreshButton from "../AllScreensComponents/RefreshButton";
import { useDispatch, useSelector } from "react-redux";
import getAllLogs from "../../data/features/ThuncFunctions/LogsThunk/GetAllLogs";
import { useEffect } from "react";

export default function Logs(){
    const dispatch = useDispatch();
    const logs = useSelector((state) => state.logs.logs);
    
    
    useEffect(() => {
        dispatch(getAllLogs());
    }, [dispatch]);
    return (
        <div className="Main-content-container">
            {/* <PageHeader/> */}
            <PageTitle Title={"Logs"} />
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '15px' }}>
              <RefreshButton onRefresh={() => {}} />
            </div>
            <table className="product-table">
                <caption>Actions Logs</caption>
                <thead>
                <tr>
                    <th>Log ID</th>
                    <th>Action</th>
                    <th>Time Stamp</th>
                    <th>UserID</th>
                    <th>Show</th>
                </tr>
                </thead>
                <tbody>
                {
                    logs.map((log) => (
                        <tr key={log.logId}>
                            <td>{log.logId}</td>
                            <td>{log.action}</td>
                            <td>{log.timeStamp}</td>
                            <td>{log.userId}</td>
                            <td>
                                <Link to={`/logs/${log.logId}/details`}>
                                    <VisibilityIcon/>
                                </Link>
                            </td>
                        </tr>
                    ))
                }
                
                </tbody>
            </table>
      </div>
    )
}