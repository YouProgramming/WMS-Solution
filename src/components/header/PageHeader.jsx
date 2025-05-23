import { Container } from "@mui/material"
import "./PageHeader.css";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link } from "react-router";
import { useSelector } from "react-redux";
import { useEffect } from "react";

export default function PageHeader(){
    // const user = null;
    // useEffect(() => {
    //     const currentUser = JSON.parse(localStorage.getItem("user"));
    //     if(currentUser){
    //         user = currentUser
    //     }
    // }, []);
    return (
        <header>
            <Container className="Header-container" style={{justifyContent: "space-between"}}>
                <div>
                    <h1>WMS</h1>
                </div>

                <div>
                    <Link to={"/account/profile/" + 1} sx={{ color: 'inherit', textDecoration: 'none' }}>
                        <AccountCircleIcon style={{fill: "white"}} sx={{ fontSize: '2.5rem'}}/>    
                    </Link>
                </div>
            </Container>
        </header>
    )
}