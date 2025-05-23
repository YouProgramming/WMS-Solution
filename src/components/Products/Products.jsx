import PageTitle from "../AllScreensComponents/PageTtitle";
import Grid from '@mui/material/Grid';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link } from "react-router";
import "./Products.css";
import RefreshButton from "../AllScreensComponents/RefreshButton";
// Fetch Data
import { useDispatch, useSelector } from "react-redux";
import {getAllProductsThunk} from "../../data/features/ThuncFunctions/ProductThunks/getAllProductsThunk.js";
import { useEffect, useState } from "react";

export function Products() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const [filterType, setFilterType] = useState('all'); // all | available | lowStock | recent
  const [Refresh, setRefresh] = useState(false);

  useEffect(() => {
      dispatch(getAllProductsThunk());
  }, [dispatch, Refresh]);

  const isRecentlyRestocked = (dateStr) => {
      if (!dateStr) return false;
      const restockedDate = new Date(dateStr);
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      return restockedDate >= sevenDaysAgo;
  };

  const availableProducts = products.filter(p => p.quantityInStock > 1);
  const lowStockProducts = products.filter(p => p.quantityInStock < 10);
  const recentlyRestocked = products.filter(p => isRecentlyRestocked(p.lastRestocked));

  // Determine what to show based on filterType
  const getFilteredProducts = () => {
      switch (filterType) {
          case 'available':
              return availableProducts;
          case 'lowStock':
              return lowStockProducts;
          case 'recent':
              return recentlyRestocked;
          default:
              return products;
      }
  };

  const filteredProducts = getFilteredProducts();

  return (
      <div className="Main-content-container">
          <div className="flex-row-small-screen" style={{ display: "flex", justifyContent: 'space-between' }}>
              <PageTitle Title={"Products"} SubeTitle={"Manage Products here"} />
              <div className="product-actions flex-row-small-screen">
                  <RefreshButton onRefresh={() => setRefresh(!Refresh)} />
                  <Link to="/products/add-product" className="action-btn add">Add New Product</Link>
                  <Link to="/products/update-product" className="action-btn update-btn">Update a Product</Link>
                  <Link to="/products/delete-product" className="action-btn delete-btn">Delete a Product</Link>
              </div>
          </div>

          <Grid className="products-counter" container marginTop={"15px"} gap={"10px"} marginLeft={"20px"}>
              <Grid>
                  <button className="product-counter" onClick={() => setFilterType('available')}>
                      <h2><ShoppingCartIcon style={{ verticalAlign: 'middle' }} /> Products Available</h2>
                      <div className="count">{availableProducts.length}</div>
                  </button>
              </Grid>
              <Grid>
                  <button className="product-counter" onClick={() => setFilterType('lowStock')}>
                      <h2><ShoppingCartIcon style={{ verticalAlign: 'middle' }} /> ⚠️ Low stock! Consider restocking.</h2>
                      <div className="count">{lowStockProducts.length}</div>
                  </button>
              </Grid>
              <Grid>
                  <button className="product-counter" onClick={() => setFilterType('recent')}>
                      <h2><ShoppingCartIcon style={{ verticalAlign: 'middle' }} /> ✅ Recently restocked</h2>
                      <div className="count">{recentlyRestocked.length}</div>
                  </button>
              </Grid>
          </Grid>

          <table className="product-table">
              <caption>Products Summary</caption>
              <thead>
                  <tr>
                      <th>Product ID</th>
                      <th>Product Name</th>
                      <th>Category</th>
                      <th>Quantity In Stock</th>
                      <th>Unit Price</th>
                      <th>Total Price</th>
                      <th>Last Restocked</th>
                      <th>Show</th>
                  </tr>
              </thead>
              <tbody>
                  {filteredProducts.map(product => (
                      <tr key={product.productId}>
                          <td>{product.productId}</td>
                          <td>{product.productName}</td>
                          <td>{product.categoryName}</td>
                          <td>{product.quantityInStock}</td>
                          <td>${product.unitPrice}</td>
                          <td>${product.totalPrice}</td>
                          <td>{product.lastRestocked ?? "-"}</td>
                          <td>
                              <Link to={`/products/${product.productId}/details`}>
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