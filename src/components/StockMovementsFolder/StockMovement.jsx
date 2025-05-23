import { useSelector, useDispatch  } from "react-redux";
import { useEffect } from "react";
import { getAllStockMovmentsThunk } from "../../data/features/ThuncFunctions/StockMovmentThunks/StockMovmentThunk";
export function StockMovement() {
    const stockMovments = useSelector(state => state.stockMovments.stockMovments);
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(getAllStockMovmentsThunk());
    }, [dispatch]);
  return (
      <div className="Main-content-container">
          <table className="product-table">
              <caption>Stock Movements</caption>
              <thead>
                  <tr>
                    <th>Product ID</th>
                    <th>Product Name</th>
                    <th>Quantity</th>
                    <th>Total Value</th>
                    <th>Transaction Type</th>
                    <th>Unit Price</th>
                    <th>Movement Date</th>
                    <th>Category Name</th>
                  </tr>
              </thead>
              <tbody>
              {stockMovments.map(stockMovment => (
                <tr key={stockMovment.totalValue}>
                <td>{stockMovment.productId}</td>
                <td>{stockMovment.productName}</td>
                <td>{stockMovment.quantity}</td>
                <td>{stockMovment.totalValue}</td>
                <td>{stockMovment.transactionType}</td>
                <td>{stockMovment.unitPrice}</td>
                <td>{stockMovment.movementDate}</td>
                <td>{stockMovment.categoryName}</td>
              </tr>
              ))}
              </tbody>
          </table>
      </div>
);
}
