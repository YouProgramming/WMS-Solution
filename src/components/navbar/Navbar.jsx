import  "./navbar.css";
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import CallReceivedIcon from '@mui/icons-material/CallReceived';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import GroupIcon from '@mui/icons-material/Group';
import ArticleIcon from '@mui/icons-material/Article';
import DashboardIcon from '@mui/icons-material/Dashboard';
import InventoryIcon from '@mui/icons-material/Inventory';
import NavbarItem from "./NavbarItem";
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from "react";
import { useNavigate } from "react-router";

export default function Navbar(){
     const [toggle, setToggle] = useState(false);
     function handleToggleButton(){
          setToggle((prev) => !prev);
     }
     const navigate = useNavigate();
     const handleLogout = () => {
       // clear auth tokens or session here
       navigate('/login'); // <-- absolute path
     };
   
    return (
        <aside style={{position: "relative", width: toggle ? "200px" : "77px"}}>
          <div style={{position: "absolute", right: toggle ? "2px" : "19px", top: "0"}}>
               <button style={{border: "none", background: "transparent", cursor: 'pointer'}} onClick={handleToggleButton}>
                    <MenuIcon style={{color : "white", fontSize: "2.5rem"}}/>
               </button>
          </div>
          <nav>
                {/* Upper List */}
                <ul>
                     <li>
                          <NavbarItem itemPath={"dashboard"} itemName={toggle ? "Dashboard" : ""} itemIocn={<DashboardIcon style={{fill: "white"}} sx={{ fontSize: '2.5rem'}}/>}/>
                     </li>
                     <li>
                          <NavbarItem itemPath={"products"} itemName={toggle ? "Producs" : ""} itemIocn={<ProductionQuantityLimitsIcon style={{fill: "white"}} sx={{ fontSize: '2.5rem'}}/>}/>
                     </li>
                     <li>
                          <NavbarItem itemPath={"stock-movement"} itemName={toggle ? "Stock Movement" : ""} itemIocn={<InventoryIcon style={{fill: "white"}} sx={{ fontSize: '2.5rem'}}/>}/>
                     </li>
                     <li>
                          <NavbarItem itemPath={"receive"} itemName={ toggle ? "Receive" : ""} itemIocn={<CallReceivedIcon style={{fill: "white"}} sx={{ fontSize: '2.5rem'}}/>}/>
                     </li>
                    
               </ul>
               {/* Lower List */}
               <ul>
                    <li>
                         <NavbarItem itemPath={"issue"} itemName={toggle ? "Issue" : ""} itemIocn={<ArrowOutwardIcon style={{fill: "white"}} sx={{ fontSize: '2.5rem'}}/>}/>
                    </li>
                    <li>
                         <NavbarItem itemPath={"logs"} itemName={ toggle ? "Logs" : ""} itemIocn={<ArticleIcon style={{fill: "white"}} sx={{ fontSize: '2.5rem'}}/>}/>
                    </li>
                    <li>
                         <NavbarItem itemPath={"users"} itemName={toggle ? "Users" : ""} itemIocn={<GroupIcon style={{fill: "white"}} sx={{ fontSize: '2.5rem'}}/>}/>
                    </li>
                    <li>
                         <NavbarItem itemPath={"/login"} itemName={toggle ? "Log Out" : ''} itemIocn={<LogoutIcon style={{fill: "white"}} sx={{ fontSize: '2.5rem'}}/>} islogout={true}/>
                         {/* <button onClick={handleLogout}><LogoutIcon style={{fill: "white"}} sx={{ fontSize: '2.5rem'}}/></button> */}
                    </li>
               </ul>
          </nav>
        </aside>
    )
}