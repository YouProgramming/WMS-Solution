import { Outlet, Route, Routes } from "react-router";
import Navbar from "../navbar/Navbar";
import PageHeader from "../header/PageHeader";

export default function PageLayout(){
    return(
        <div>
            <PageHeader/>
            <div style={{display: "flex",  overflow: 'visible'}}>
                <Navbar/>
                <div style={{flex: "1"}}>
                    <Outlet/>
                </div>
            </div>
        </div>
    )
}