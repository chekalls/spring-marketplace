import { Routes, Route, Navigate } from "react-router-dom";
import ProductList from "./ProductList";
import ProductForm from "./ProductForm";
import ProductDetails from "./ProductDetails";
import EditProduct from "./ProductModificationForm";

const Product: React.FC = () =>{
    return (
        <Routes>
            <Route path="list" element={<ProductList />} />
            <Route path="form" element={<ProductForm />} />
            <Route path=":id" element={<ProductDetails />} />
            <Route  path="edit/:id" element={<EditProduct />} />
            <Route index element={<Navigate to="list" replace/>} />
        </Routes>
    );
}

export default Product;