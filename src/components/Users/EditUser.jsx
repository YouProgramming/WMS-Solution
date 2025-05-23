import PageTitle from "../AllScreensComponents/PageTtitle";
import "./Profile.css";
import "./AddEditUser.css"
import Grid from '@mui/material/Grid';
import ProfilePicture from "../../assets/ProfilePicture.jpg";
import { useNavigate} from "react-router";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import getAllUsers from "../../data/features/ThuncFunctions/UsersThunk/GetAllUsers";
import addNewUser from "../../data/features/ThuncFunctions/UsersThunk/AddNewUser";
import updateUser from "../../data/features/ThuncFunctions/UsersThunk/UpdateUser";

export default function EditUser({isAddNew}){
    const dispatch = useDispatch();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    
    const {username: usernameParam} = useParams();
    const [formData, setFormData] = useState({
        username: '',
        password: '', // This will be sent as empty string
        newPassword: '', // This will be sent as null if empty
        name: '',
        email: '',
        profilePicture: null,
        profilePicturePath: ""
    });

    useEffect(() => {
        if (!isAddNew && usernameParam) {
            setLoading(true);
            dispatch(getAllUsers())
                .then(() => setLoading(false))
                .catch((err) => {
                    setLoading(false);
                    setError(err.message || "Failed to load user data");
                });
        }
    }, [dispatch, isAddNew, usernameParam]);

    const user = useSelector((state) => {
        if (!usernameParam) return null;
        return state.users.users?.find(u => u.username === usernameParam) || null;
    });

    useEffect(() => {
        if (user) {
            setFormData({
                username: user.username,
                password: "", // Send empty string for existing password
                newPassword: "", // Send empty string if not changing password
                name: user.name,
                email: user.email,
                profilePicture: null,
                profilePicturePath: user.profilePicturePath
            });
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const [previewUrl, setPreviewUrl] = useState(null);

    const navigate = useNavigate();
    const handleFormSubmit = async(e) => {
        e.preventDefault();
        
        // Validation
        if (!formData.username.trim()) {
            setError("Username is required");
            return;
        }
        if (!formData.email.trim()) {
            setError("Email is required");
            return;
        }
        if (!formData.name.trim()) {
            setError("Name is required");
            return;
        }

        const formDataSend = new FormData();
        formDataSend.append('Username', formData.username);
        formDataSend.append('Password', ''); // Always send empty string
        if (formData.newPassword.trim()) {
            formDataSend.append('NewPassword', formData.newPassword);
        } else {
            formDataSend.append('NewPassword', null); // Send null if password not changed
        }
        formDataSend.append('Name', formData.name);
        formDataSend.append('Email', formData.email);
        if (formData.profilePicture) {
            formDataSend.append('ProfilePicture', formData.profilePicture);
        }

        if (previewUrl) {
            URL.revokeObjectURL(previewUrl);
            setPreviewUrl(null);
        }
        
        try {
            setLoading(true);
            setError(null);
            
            if(isAddNew){
                const Result = await dispatch(addNewUser(formDataSend));
                if(Result.meta.requestStatus === "fulfilled"){
                    navigate("/users");
                }else{
                    throw new Error(Result.error);
                }
            }else{
                const Result = await dispatch(updateUser(formDataSend));
                if(Result.meta.requestStatus === "fulfilled"){
                    navigate("/users");
                }else{
                    throw new Error(Result.error);
                }
            }
        } catch (err) {
            setError(err.message || "Failed to save user");
        } finally {
            setLoading(false);
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            setFormData((prevData) => ({
                ...prevData,
                profilePicture: file,
            }));
        }

        const objectUrl = URL.createObjectURL(file);
        setPreviewUrl(objectUrl); 
    };

    return (
        <div className="Main-content-container">
            {loading && (
                <div className="loading-overlay">
                    <div>Loading...</div>
                </div>
            )}
            {error && (
                <div className="error-message" style={{color: "red", fontSize: "14px", fontWeight: "bold", textAlign: "center"}}>
                    {error}
                </div>
            )}
            {/* <PageHeader/> */}
            <PageTitle Title={isAddNew ? "Add new user" : "Update user"} SubeTitle={""}/>
            <Grid container gap={"35px"} marginY={"15px"}>
                <Grid
                    size={{ xs: 12, sm: 4 }}
                    className="image-upload-grid"
                    container
                    justifyContent="center"
                    alignItems="center"
                    >
                    <img 
                        src={
                            formData.ProfilePicture 
                                ? previewUrl 
                                : user?.profilePicturePath 
                                    ? `http://localhost:5062/api/Account/images?relativePath=${user.profilePicturePath}`
                                    : ProfilePicture
                        } 
                        alt="Profile" 
                        className="profile-image" 
                        onError={(e) => {
                            e.currentTarget.src = ProfilePicture;
                        }}
                    />
                    <input
                        type="file" 
                        id="ProfilePicture"
                        name="ProfilePicture"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="image-input"
                    />

                    <label htmlFor="ProfilePicture" className="image-label">
                        Change Picture
                    </label>
                </Grid>
                <Grid size={{ xs:12, sm:6 }} height={"350px"} display={"flex"} alignItems={"center"} justifyContent={"space-between"} paddingLeft={"20px"}>
                    <div className="Profile-Details">
                    <form className="form-container" onSubmit={handleFormSubmit}>
                        <label htmlFor="username">Username:</label>
                        <input
                            type="text"
                            name="username"
                            id="username"
                            value={formData.username}
                            onChange={handleChange}
                        />

                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            name="newPassword"
                            id="password"
                            value={formData.newPassword}
                            onChange={handleChange}
                            placeholder="Leave empty if you don't want to change the password"
                        />

                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />

                        <label htmlFor="name">Name:</label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                        <button type="submit" className="Update-Button">Submit</button>
                    </form>
                    </div>
                    <div>
                        <button className="cancel-button" onClick={() => navigate(-1)}>Cancel</button>
                    </div>
                </Grid>
            </Grid>
        </div>
    )
}  
