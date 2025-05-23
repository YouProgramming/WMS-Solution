import React from 'react';
import './Dashboard.css';
import { Link } from 'react-router';
import RefreshButton from '../AllScreensComponents/RefreshButton';
import {getAllProductsThunk} from "../../data/features/ThuncFunctions/ProductThunks/getAllProductsThunk.js";
import getAllReceivings from '../../data/features/ThuncFunctions/RecievingThunks/getAllReceivingsThunk.js';
import getAllIssuings from '../../data/features/ThuncFunctions/IssuingThunks/GetAllIssuings.js';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
const Dashboard = () => {
  // Product Statistics
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);
  const { receivings } = useSelector((state) => state.receivings);
  const { issuings } = useSelector((state) => state.issuings);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    dispatch(getAllProductsThunk());
  }, [dispatch, refresh]);

  useEffect(() => {
    dispatch(getAllReceivings());
  }, [dispatch, refresh]);

  useEffect(() => {
    dispatch(getAllIssuings());
  }, [dispatch, refresh]);

  const productStats = {
    totalProducts: products.length,
    lowStock: products.filter((product) => product.quantityInStock < 10 && product.quantityInStock > 0).length,
    outOfStock: products.filter((product) => product.quantityInStock === 0).length,
    totalValue: products.reduce((total, product) => total + product.unitPrice, 0)
  };

  // Receiving Statistics
  const receivingStats = {
    todayReceivings: receivings.filter((receiving) => receiving.receiveDate === new Date().toISOString().split('T')[0]).length,
    totalReceivings: receivings.length,
    last7Days: receivings.filter((receiving) => {
      const date = new Date(receiving.receiveDate);
      const today = new Date();
      return date >= new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);
    }).length
  };

  // Issuing Statistics
  const issuingStats = {
    todayIssues: issuings.filter((issuing) => issuing.issueDate === new Date().toISOString().split('T')[0]).length,
    totalIssues: issuings.length,
    last7Days: issuings.filter((issuing) => {
      const date = new Date(issuing.issueDate);
      const today = new Date();
      return date >= new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);
    }).length
  };
  
  return (
    <div className="dashboard Main-content-container">
      <div className="dashboard-header">
        <h1>Warehouse Management Dashboard</h1>
        <div className="dashboard-actions">
          <RefreshButton onRefresh={() => setRefresh(!refresh)} />
        </div>
      </div>

      <div className="dashboard-content">
        {/* Products Overview */}
        <div className="dashboard-card">
          <h2>Products Overview</h2>
          <div className="card-value">{productStats.totalProducts}</div>
          <div className="card-description">Total Products</div>
          <div className="progress-bar">
            <div className="progress" style={{ width: `${(productStats.totalProducts / 100) * 100}%` }}></div>
          </div>
        </div>

        <div className="dashboard-card">
          <h2>Stock Status</h2>
          <div className="card-value">{productStats.lowStock}</div>
          <div className="card-description">Items Low on Stock</div>
          <div className="progress-bar">
            <div className="progress" style={{ width: `${(productStats.lowStock / productStats.totalProducts) * 100}%`, background: '#ff9800' }}></div>
          </div>
        </div>

        <div className="dashboard-card">
          <h2>Out of Stock</h2>
          <div className="card-value">{productStats.outOfStock}</div>
          <div className="card-description">Items Out of Stock</div>
          <div className="progress-bar">
            <div className="progress" style={{ width: `${(productStats.outOfStock / productStats.totalProducts) * 100}%`, background: '#f44336' }}></div>
          </div>
        </div>

        <div className="dashboard-card">
          <h2>Total Inventory Value</h2>
          <div className="card-value">${productStats.totalValue.toFixed(2)}</div>
          <div className="card-description">Current Inventory Value</div>
        </div>

        {/* Receiving Statistics */}
        <div className="dashboard-card">
          <h2>Today's Receivings</h2>
          <div className="card-value">{receivingStats.todayReceivings}</div>
          <div className="card-description">New Receivings Today</div>
        </div>

        <div className="dashboard-card">
          <h2>Total Receivings</h2>
          <div className="card-value">{receivingStats.totalReceivings}</div>
          <div className="card-description">Total Receivings This Month</div>
        </div>

        <div className="dashboard-card">
          <h2>7-Day Receivings</h2>
          <div className="card-value">{receivingStats.last7Days}</div>
          <div className="card-description">Receivings in Last 7 Days</div>
        </div>

        {/* Issuing Statistics */}
        <div className="dashboard-card">
          <h2>Today's Issues</h2>
          <div className="card-value">{issuingStats.todayIssues}</div>
          <div className="card-description">New Issues Today</div>
        </div>

        <div className="dashboard-card">
          <h2>Total Issues</h2>
          <div className="card-value">{issuingStats.totalIssues}</div>
          <div className="card-description">Total Issues This Month</div>
        </div>

        <div className="dashboard-card">
          <h2>7-Day Issues</h2>
          <div className="card-value">{issuingStats.last7Days}</div>
          <div className="card-description">Issues in Last 7 Days</div>
        </div>

        {/* Quick Actions */}
        <div className="quick-actions">
          <Link to="/products" className="quick-action-card">
            <i className="fas fa-box"></i>
            <h3>Manage Products</h3>
          </Link>
          <Link to="/receive" className="quick-action-card">
            <i className="fas fa-truck"></i>
            <h3>Manage Receivings</h3>
          </Link>
          <Link to="/issue" className="quick-action-card">
            <i className="fas fa-shipping-fast"></i>
            <h3>Manage Issues</h3>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
