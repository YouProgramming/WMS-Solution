import { Link } from "react-router";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import {logout} from "../../data/features/Slices/UserSlice";

export default function NavbarItem({itemName, itemPath, itemIocn, islogout = false}){
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = (e) => {
        e.preventDefault();
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        dispatch(logout());
        navigate('/login');
    };
      
    if(islogout === true)
    {
        return(
            <button className="logout-button" onClick={handleLogout}>
                {itemIocn}
                <span>{itemName}</span>
            </button>
        )   
    }
    
    return(
        <Link to={`/${itemPath}`}>
            {itemIocn}
            <span>{itemName}</span>
        </Link>
    )
}