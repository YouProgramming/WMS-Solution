import PageTitle from "../AllScreensComponents/PageTtitle";
import Grid from '@mui/material/Grid';
import ProfilePicture from "../../assets/ProfilePicture.jpg";
import { Link } from "react-router";
import "./Profile.css"
import { useSelector } from "react-redux";
import { useParams } from "react-router";
export default function Profile({isCurrentUser}){
    let user = null;
    if(isCurrentUser){
        const currentUser = useSelector((state) => state.users.currentUser)
        if(currentUser){
            user = currentUser
        }else{
            user = {
                username: "??",
                name: "??",
                email: "??",
                role: "??",
                profilePicturePath: ""
            }
        }
    }else{
        const users = useSelector((state) => state.users.users)
        if(users.length === 0){
            user = {
                username: "??",
                name: "??",
                email: "??",
                role: "??",
                profilePicturePath: ""
            }
        }else{
            const {username} = useParams();
            user = users.find(user => user.username === username)
        }
    }
    return(
        <div className="Main-content-container">
            <PageTitle Title={"Profile"} SubeTitle={""}/>
            <Grid container gap={"35px"} marginY={"15px"}>
                <Grid size={{ xs:12, sm:4 }} height={"350px"} display={"flex"} justifyContent={"center"}>
                    <img src={user.profilePicturePath !== "" ? 'http://localhost:5062/api/Account/images?relativePath=' + user.profilePicturePath : ProfilePicture} alt="nnn" style={{maxWidth: "100%", maxHeight: "100%", borderRadius: "50%"}}/>
                </Grid>

                <Grid size={{ xs:12, sm:6 }} height={"350px"} display={"flex"} alignItems={"center"} justifyContent={"space-between"} paddingLeft={"20px"}>
                    <div className="Profile-Details">
                        <dl style={{display: 'flex', flexDirection: "column", gap:"20px"}}>
                            <span style={{display: 'flex', gap:"20px"}}>
                            <dt>Username:</dt>
                            <dd>{user.username}</dd>
                            </span>
                            <span style={{display: 'flex', gap:"20px"}}>
                            <dt>Password:</dt>
                            <dd>{"**********"}</dd>
                            </span>
                            <span style={{display: 'flex', gap:"20px"}}>
                            <dt>Email:</dt>
                            <dd>{user.email}</dd>
                            </span>
                            <span style={{display: 'flex', gap:"20px"}}>
                            <dt>Full Name:</dt>
                            <dd>{user.name}</dd>
                            </span>
                        </dl>
                    </div>
                    <div>
                        <Link to={"/account/profile/" + user.username + "/edit"} className="Update-Button">Update</Link>
                    </div>
                </Grid>
            </Grid>
        </div>
    )
}