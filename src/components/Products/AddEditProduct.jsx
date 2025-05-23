import PageTitle from "../AllScreensComponents/PageTtitle";
import Grid from '@mui/material/Grid';
import ProfilePicture from "../../assets/ProfilePicture.jpg";
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { addProductThunk } from '../../data/features/ThuncFunctions/ProductThunks/addProductThunk.js';
import { updateProductThunk } from '../../data/features/ThuncFunctions/ProductThunks/updateProductThunk.js';
import { getProductByIdThunk } from '../../data/features/ThuncFunctions/ProductThunks/getProductByIdThunk.js';
import { getAllCategoriesThunk } from '../../data/features/ThuncFunctions/CategoryThunks/GetAllCategoriesThunk.js';
import { useNavigate } from 'react-router';
import "./AddEditProduc.css"

// export default function AddEditProduct({isUpdate}){
//     const navigate = useNavigate();
//     const dispatch = useDispatch();
//     const { productId } = useParams();
//     const product = useSelector((state) => state.products.selectedProduct);
//     const categories = useSelector((state) => state.categories.categories);
//     const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
//     const [categoryId, setCategoryId] = useState('');
//     useEffect(() => {
//         if (productId) {
//             dispatch(getProductByIdThunk(productId));
//         }
//     }, [productId, dispatch]);
//     useEffect(() => {
//         dispatch(getAllCategoriesThunk());
//     }, []);
//     const [formData, setFormData] = useState({
//         ProductId: '0',
//         ProductName: '',
//         Description: '',
//         UnitPrice: '',
//         QuantityInStock: '',
//         Category: '',
//         imageSrc: null,
//         imageSrcPath: ''
//       });
//     useEffect(() => {
//         if (product) {
//             setFormData({
//                 ProductId: product.productId,
//                 ProductName: product.productName,
//                 Description: product.description,
//                 UnitPrice: product.unitPrice,
//                 QuantityInStock: product.quantityInStock,
//                 Category: product.categoryId,
//                 imageSrcPath: product.productImagePath
//             });
//         }
//     }, [product]);

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData((prevData) => ({
//             ...prevData,
//             [name]: value,
//         }));
//     };
//     const handleCategoryChange = (e) => {
//         const { value } = e.target;
//         const category = categories.find((category) => category.categoryName === value);
//         setCategoryId(category.categoryId);
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         const formDataSent = new FormData();
//         formDataSent.append('productId', formData.ProductId);
//         formDataSent.append('productName', formData.ProductName);
//         formDataSent.append('description', formData.Description);
//         formDataSent.append('unitPrice', formData.UnitPrice);
//         formDataSent.append('quantityInStock', formData.QuantityInStock);
//         formDataSent.append('categoryId', categoryId);
//         formDataSent.append('productImage', formData.imageSrc);
//         if(isUpdate){
//             formDataSent.append('categoryId', categoryId);
//         }
//        console.log(formData)
//         if (isUpdate) {
//             dispatch(updateProductThunk(formDataSent));
//         } else {
//             dispatch(addProductThunk(formDataSent));
//         }
//         URL.revokeObjectURL(imagePreviewUrl);
//         navigate('/products');
//     };

//     const handleImageChange = (e) => {
//         const file = e.target.files[0];
//         if (file) {
//             const objectUrl = URL.createObjectURL(file);
//             setImagePreviewUrl(objectUrl);
//             setFormData((prevData) => ({
//                 ...prevData,
//                 imageSrc: file,
//             }));
//         }
//     };
    
//     const CategoryFetching = () => {
//         if(isUpdate){
//              return categories.find((category) => category.categoryName === formData.Category);
//         }else{
//             return categories;
//         }
//     }

//     return (
//         <div className="Main-content-container">
//             {/* <PageHeader/> */}
//             <PageTitle Title={isUpdate ? "Add New Product" : "Update Product"} SubeTitle={""}/>
//             <Grid container gap={"35px"} marginY={"15px"}>
//                 <Grid
//                     size={{ xs: 12, sm: 4 }}
//                     className="image-upload-grid"
//                     container
//                     justifyContent="center"
//                     alignItems="center"
//                     >
//                     <img src={imagePreviewUrl ||
//                         (formData.imageSrcPath && formData.imageSrcPath.trim() !== ""
//                         ? "http://localhost:5062/api/ProductImages/images?relativePath=" + formData.imageSrcPath
//                         : ProfilePicture)
//                         } alt="Product Pic" className="Product-image" />

//                     <input
//                         type="file"
//                         id="imageSrc"
//                         name="imageSrc"
//                         accept="image/*"
//                         onChange={handleImageChange}
//                         className="image-input"
//                     />

//                     <label htmlFor="imageSrc" className="image-label">
//                         Change Picture
//                     </label>
//                 </Grid>

//                 <Grid size={{ xs:12, sm:6 }} height={"350px"} display={"flex"} alignItems={"center"} paddingLeft={"20px"}>
//                    <form onSubmit={handleSubmit} className="add-update-product-form">
//                         <div className="form-group">
//                             <label htmlFor="ProductId">Product ID:</label>
//                             <input
//                             type="text"
//                             id="ProductId"
//                             name="ProductId"
//                             onChange={handleChange}
//                             value={formData.ProductId}
//                             readOnly
//                             />
//                         </div>
                        
//                         <div className="form-group">
//                             <label htmlFor="ProductName">Product Name:</label>
//                             <input
//                             type="text"
//                             id="ProductName"
//                             name="ProductName"
//                             onChange={handleChange}
//                             value={formData.ProductName}
//                             />
//                         </div>
//                         <div className="form-group">
//                             <label htmlFor="Description">Description:</label>
//                             <input
//                             type="text"
//                             id="Description"
//                             name="Description"
//                             onChange={handleChange}
//                             value={formData.Description}
//                             />
//                         </div>
//                         <div className="form-group">
//                             <label htmlFor="UnitPrice">UnitPrice:</label>
//                             <input
//                             type="text"
//                             id="UnitPrice"
//                             name="UnitPrice"
//                             onChange={handleChange}
//                             value={formData.UnitPrice}
//                             />
//                         </div>
//                         <div className="form-group">
//                             <label htmlFor="QuantityInStock">Quantity In Stock:</label>
//                             <input
//                             type="text"
//                             id="QuantityInStock"
//                             name="QuantityInStock"
//                             onChange={handleChange}
//                             value={formData.QuantityInStock}
//                             />
//                         </div>
//                         <div className="form-group">
//                             <label htmlFor="QuantityInStock">Quantity In Stock:</label>
//                             <select
//                             id="Category"
//                             name="Category"
//                             value={formData.Category ?? CategoryFetching().categoryName}
//                             className="form-control"
//                             onChange={handleCategoryChange}
//                             required
//                             >
//                                 {categories.map((category) => (
//                                     <option key={category.categoryId} value={category.categoryName}>
//                                         {category.categoryName}
//                                     </option>
//                                 ))}
//                             </select>
//                         </div>
//                         <div className="form-group" style={{margin: "0 auto"}}>
//                             <button type="submit" className="submit-btn">Submit</button>
//                         </div>
//                    </form>
//                 </Grid>
//             </Grid>
//         </div>
//     )
// }

export default function AddEditProduct({ isUpdate }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { productId } = useParams();

    const product = useSelector((state) => state.products.selectedProduct);
    const categories = useSelector((state) => state.categories.categories);
    const [imagePreviewUrl, setImagePreviewUrl] = useState(null);

    const [formData, setFormData] = useState({
        ProductId: '0',
        ProductName: '',
        Description: '',
        UnitPrice: '',
        QuantityInStock: '',
        Category: '', // Will be initialized once categories are loaded
        imageSrc: null,
        imageSrcPath: ''
    });

    useEffect(() => {
        if (productId) {
            dispatch(getProductByIdThunk(productId));
        }
    }, [productId, dispatch]);

    useEffect(() => {
        dispatch(getAllCategoriesThunk());
    }, [dispatch]);

    useEffect(() => {
        // When product is fetched, update formData
        if (product) {
            setFormData({
                ProductId: product.productId,
                ProductName: product.productName,
                Description: product.description,
                UnitPrice: product.unitPrice,
                QuantityInStock: product.quantityInStock,
                Category: product.categoryId, // Store categoryId, not categoryName
                imageSrc: null,
                imageSrcPath: product.productImagePath
            });
        }
    }, [product]);

    useEffect(() => {
        // Set default categoryId on Add mode once categories are available
        if (!isUpdate && categories.length > 0) {
            setFormData(prev => ({
                ...prev,
                Category: categories[0].categoryId
            }));
        }
    }, [categories, isUpdate]);

    useEffect(() => {
        // Cleanup for object URL
        return () => {
            if (imagePreviewUrl) {
                URL.revokeObjectURL(imagePreviewUrl);
            }
        };
    }, [imagePreviewUrl]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formDataSent = new FormData();
        formDataSent.append('productId', formData.ProductId);
        formDataSent.append('productName', formData.ProductName);
        formDataSent.append('description', formData.Description);
        formDataSent.append('unitPrice', formData.UnitPrice);
        formDataSent.append('quantityInStock', formData.QuantityInStock);
        formDataSent.append('categoryId', formData.Category); // Use formData.Category (categoryId)
        formDataSent.append('productImage', formData.imageSrc);

        if (isUpdate) {
            dispatch(updateProductThunk(formDataSent));
        } else {
            dispatch(addProductThunk(formDataSent));
        }

        navigate('/products');
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const objectUrl = URL.createObjectURL(file);
            setImagePreviewUrl(objectUrl);
            setFormData((prevData) => ({
                ...prevData,
                imageSrc: file,
            }));
        }
    };

    return (
        <div className="Main-content-container">
            <PageTitle Title={isUpdate ? "Update Product" : "Add New Product"} SubeTitle="" />
            {/* 🛠️ Fixed inverted title condition above */}

            <Grid container gap="35px" marginY="15px">
                <Grid
                    size={{ xs: 12, sm: 4 }}
                    className="image-upload-grid"
                    container
                    justifyContent="center"
                    alignItems="center"
                >
                    <img
                        src={
                            imagePreviewUrl ||
                            (formData.imageSrcPath?.trim()
                                ? "http://localhost:5062/api/ProductImages/images?relativePath=" + formData.imageSrcPath
                                : ProfilePicture)
                        }
                        alt="Product Pic"
                        className="Product-image"
                    />

                    <input
                        type="file"
                        id="imageSrc"
                        name="imageSrc"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="image-input"
                    />
                    <label htmlFor="imageSrc" className="image-label">
                        Change Picture
                    </label>
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }} height="350px" display="flex" alignItems="center" paddingLeft="20px">
                    <form onSubmit={handleSubmit} className="add-update-product-form">
                        <div className="form-group">
                            <label htmlFor="ProductId">Product ID:</label>
                            <input
                                type="text"
                                id="ProductId"
                                name="ProductId"
                                onChange={handleChange}
                                value={formData.ProductId}
                                readOnly
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="ProductName">Product Name:</label>
                            <input
                                type="text"
                                id="ProductName"
                                name="ProductName"
                                onChange={handleChange}
                                value={formData.ProductName}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="Description">Description:</label>
                            <input
                                type="text"
                                id="Description"
                                name="Description"
                                onChange={handleChange}
                                value={formData.Description}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="UnitPrice">Unit Price:</label>
                            <input
                                type="text"
                                id="UnitPrice"
                                name="UnitPrice"
                                onChange={handleChange}
                                value={formData.UnitPrice}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="QuantityInStock">Quantity In Stock:</label>
                            <input
                                type="text"
                                id="QuantityInStock"
                                name="QuantityInStock"
                                onChange={handleChange}
                                value={formData.QuantityInStock}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="Category">Category:</label>
                            <select
                                id="Category"
                                name="Category"
                                value={formData.Category}
                                className="form-control"
                                onChange={(e) => {
                                    handleChange(e);
                                }}
                                required
                            >
                                {categories.map((category) => (
                                    <option key={category.categoryId} value={category.categoryId}>
                                        {category.categoryName}
                                    </option>
                                ))}
                            </select>
                            {/* 🛠️ Fixed: use categoryId as value and update both formData and state */}
                        </div>
                        <div className="form-group" style={{ margin: "0 auto" }}>
                            <button type="submit" className="submit-btn">Submit</button>
                        </div>
                    </form>
                </Grid>
            </Grid>
        </div>
    );
}
