import { Routes, Route, Navigate } from "react-router-dom";
import ProductList from "./ProductList";

const Product: React.FC = () =>{

    return (
        <Routes>
            <Route path="list" element={<ProductList />} />
            <Route index element={<Navigate to="list" replace />} />
        </Routes>
    );
}

export default Product;