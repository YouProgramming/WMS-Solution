import PageTitle from "../AllScreensComponents/PageTtitle";
import Grid from '@mui/material/Grid';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import VisibilityIcon from '@mui/icons-material/Visibility';
import "../Products/Products.css";
import { Link } from "react-router";
import RefreshButton from "../AllScreensComponents/RefreshButton";
// Fetch Data
import { useDispatch, useSelector } from "react-redux";
import getAllReceivings from "../../data/features/ThuncFunctions/RecievingThunks/getAllReceivingsThunk";
import { useEffect, useState } from "react";
// export function Receive() {
//     const dispatch = useDispatch();
//     const allReceivings = useSelector((state) => state.receivings.receivings);
//     const [refresh, setRefresh] = useState(false);
//     const [sortedReceivings, setSortedReceivings] = useState(allReceivings);
//     const [isSorted, setIsSorted] = useState(false);

//     useEffect(() => {
//       dispatch(getAllReceivings());
//     }, [dispatch,refresh]);

//     const handleRefresh = () => {
//       setRefresh(!refresh);
//     };

//     const handleSort = () => {
//       const sorted = [...allReceivings].sort((a, b) => {
//         const dateA = new Date(a.receiveDate);
//         const dateB = new Date(b.receiveDate);
//         return isSorted ? dateA - dateB : dateB - dateA;
//       });
//       setIsSorted(!isSorted);
//       setSortedReceivings(sorted);
//     };
  
//     return (
//       <div className="Main-content-container">
//           {/* <PageHeader/> */}

//           <div className="flex-row-small-screen" style={{display: "flex", justifyContent: 'space-between'}}>
//             <PageTitle Title={"Receivings"} SubeTitle={"Manage Receivings here"}/>
//             <div className="product-actions flex-row-small-screen">
//               <RefreshButton onClick={handleRefresh} />
//               <Link to="/receive/add-receiving" className="action-btn add">Add New Receiving</Link>
//               <Link to="/receive/update-receiving" className="action-btn update-btn">Update a Receiving</Link>
//               <Link to="/receive/delete-receiving" className="action-btn delete-btn">Delete a Receiving</Link>
//             </div>
//           </div>

//         <Grid className="products-counter" container marginTop={"15px"} gap={"10px"} marginLeft={"20px"} >
//           <Grid width={"100%"}>
//             <button 
//               className="product-counter" 
//               style={{width: "100%"}}
//               onClick={handleSort}
//             >
//               <h2><ShoppingCartIcon style={{ verticalAlign: 'middle' }} />✅ Recently restocked</h2>
//               <div className="count">{allReceivings.length}</div>
//             </button>
//           </Grid>
//         </Grid>

//         <table className="product-table">
//           <caption>Products Receivings Summary</caption>
//           <thead>
//             <tr>
//               <th>Receive ID</th>
//               <th>QuantityReceived</th>
//               <th>ReceiveDate</th>
//               <th>ProductID</th>
//               <th>Show</th>
//             </tr>
//           </thead>
//           <tbody>
//             {sortedReceivings.map((receiving) => (
//               <tr key={receiving.receiveId}>
//                 <td>{receiving.receiveId}</td>
//                 <td>{receiving.quantityReceived}</td>
//                 <td>{receiving.receiveDate}</td>
//                 <td>{receiving.productId}</td>
//                 <td>
//                 <Link to={`/receive/${receiving.receiveId}/details`}>
//                   <VisibilityIcon/>
//                 </Link>
//               </td>
//             </tr>
//           ))}
//           </tbody>
//         </table>
//       </div>
//     );
// }

export function Receive() {
  const dispatch = useDispatch();
  const allReceivings = useSelector((state) => state.receivings.receivings);

  const [refresh, setRefresh] = useState(false);
  const [sortedReceivings, setSortedReceivings] = useState([]);
  const [isAscending, setIsAscending] = useState(true);

  // Fetch receivings
  useEffect(() => {
    dispatch(getAllReceivings());
  }, [dispatch, refresh]);

  // Sync sortedReceivings with allReceivings when fetched
  useEffect(() => {
    setSortedReceivings(allReceivings);
  }, [allReceivings]);

  // Refresh button logic
  const handleRefresh = () => {
    setRefresh(!refresh);
  };

  // Sort toggle logic
  const handleSort = () => {
    const sorted = [...allReceivings].sort((a, b) => {
      const dateA = new Date(a.receiveDate);
      const dateB = new Date(b.receiveDate);
      return isAscending ? dateA - dateB : dateB - dateA;
    });
    setSortedReceivings(sorted);
    setIsAscending(!isAscending); // Toggle for next click
  };

  return (
    <div className="Main-content-container">
      <div className="flex-row-small-screen" style={{ display: "flex", justifyContent: 'space-between' }}>
        <PageTitle Title={"Receivings"} SubeTitle={"Manage Receivings here"} />
        <div className="product-actions flex-row-small-screen">
          <RefreshButton onClick={handleRefresh} />
          <Link to="/receive/add-receiving" className="action-btn add">Add New Receiving</Link>
          <Link to="/receive/update-receiving" className="action-btn update-btn">Update a Receiving</Link>
          <Link to="/receive/delete-receiving" className="action-btn delete-btn">Delete a Receiving</Link>
        </div>
      </div>

      <Grid className="products-counter" container marginTop={"15px"} gap={"10px"} marginLeft={"20px"}>
        <Grid width={"100%"}>
          <button
            className="product-counter"
            style={{ width: "100%" }}
            onClick={handleSort}
          >
            <h2>
              <ShoppingCartIcon style={{ verticalAlign: 'middle' }} />
              {isAscending ? '⬆️ Oldest First' : '⬇️ Newest First'}
            </h2>
            <div className="count">{allReceivings.length}</div>
          </button>
        </Grid>
      </Grid>

      <table className="product-table">
        <caption>Products Receivings Summary</caption>
        <thead>
          <tr>
            <th>Receive ID</th>
            <th>QuantityReceived</th>
            <th>ReceiveDate</th>
            <th>ProductID</th>
            <th>Show</th>
          </tr>
        </thead>
        <tbody>
          {sortedReceivings.map((receiving) => (
            <tr key={receiving.receiveId}>
              <td>{receiving.receiveId}</td>
              <td>{receiving.quantityReceived}</td>
              <td>{receiving.receiveDate}</td>
              <td>{receiving.productId}</td>
              <td>
                <Link to={`/receive/${receiving.receiveId}/details`}>
                  <VisibilityIcon />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
