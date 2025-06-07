import './App.css'
import { Routes, Route } from "react-router";
import { Products } from './components/Products/Products';
import Dashboard from './components/Dashboard/Dashboard';
import PageLayout from './components/AllScreensComponents/PageLayout';
import { Receive } from './components/Receive/Receive';
import { Issue } from './components/Issue/Issue';
import Logs from './components/LogedActions/cmpLogs';
import Users from "./components/Users/cmpUsers.jsx"
import Profile from './components/Users/Profile.jsx';
import EditUser from './components/Users/EditUser.jsx';
import DeleteUpdateProducts from './components/Products/DeleteUpdateProducts.jsx';
import AddEditProduct from './components/Products/AddEditProduct.jsx';
import ProductDetails from './components/Products/ProductDetails.jsx';
import DeleteUpdateReceiving from './components/Receive/DeleteUpdateReceiving.jsx';
import AddEditReceiving from './components/Receive/AddEditReceiving.jsx';
import ReceivingDetails from './components/Receive/ReceivingDetails.jsx';
import IssueDetails from './components/Issue/IssueDetails.jsx';
import AddEditIssue from './components/Issue/AddEditIssue.jsx';
import LogDetails from './components/LogedActions/LogDetails.jsx';
import Login from './components/Users/Login.jsx';
import {StockMovement} from './components/StockMovementsFolder/StockMovement.jsx';
// import {Profile} from "./components/Users/Profile"
// import {Login} from "./components/Users/Login"
function App() {
  
  return (
    <div>
      {/* <PageHeader/> */}

      <Routes>
        <Route path='' index element={<Login/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/*' element={<PageLayout/>}>
          <Route index element={<Dashboard/>} />
          <Route path='dashboard' element={<Dashboard/>} />
          <Route path='products'  element={<Products/>}/>
          <Route path='products/:productId/details'  element={<ProductDetails/>}/>
          <Route path='products/update-product'  element={<DeleteUpdateProducts isUpdate={true}/>}/>
          <Route path='products/delete-product'  element={<DeleteUpdateProducts isUpdate={false}/>}/>
          <Route path='products/add-product'  element={<AddEditProduct isUpdate={false}/>}/>
          <Route path='products/:productId/edit'  element={<AddEditProduct isUpdate={true}/>}/>
          <Route path='stock-movement'  element={<StockMovement/>}/>
          <Route path='receive'  element={<Receive/>}/>
          <Route path='receive/:receivingId/details'  element={<ReceivingDetails/>}/>
          <Route path='receive/update-receiving'  element={<DeleteUpdateReceiving isUpdate={true}/>}/>
          <Route path='receive/delete-receiving'  element={<DeleteUpdateReceiving isUpdate={false}/>}/>
          <Route path='receive/:receivingId/edit'  element={<AddEditReceiving isUpdate={true}/>}/>
          <Route path='receive/add-receiving'  element={<AddEditReceiving isUpdate={false}/>}/>
          <Route path='issue'  element={<Issue/>}/>
          <Route path='issue/:issueId/details'  element={<IssueDetails/>}/>
          <Route path='issue/:issueId/edit'  element={<AddEditIssue isUpdate={true}/>}/>
          <Route path='issue/add-issue'  element={<AddEditIssue isUpdate={false}/>}/>
          <Route path='logs'  element={<Logs/>}/>
          <Route path='logs/:logId/details'  element={<LogDetails/>}/>
          <Route path='users'  element={<Users/>}/>
          <Route path='users/add-new'  element={<EditUser isAddNew={true}/>}/>
          <Route path='users/:username/account/profile' element={<Profile isCurrentUser={false}/>}/>
          <Route path='users/:username/account/profile/edit' element={<EditUser isAddNew={false}/>}/>
          <Route path='account/profile/:username' element={<Profile isCurrentUser={true}/>}/>
          <Route path='account/profile/:username/edit' element={<EditUser isAddNew={false}/>}/>
        </Route>
      </Routes>
    </div>
      
  )
}

export default App
