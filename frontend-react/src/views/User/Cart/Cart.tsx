import { Routes, Route, Navigate } from "react-router-dom";
import CartContent from "./CartContent";

const Cart: React.FC = () =>{
    return (
        <Routes>
            <Route path="content" element={<CartContent />}  />
            <Route index element={<Navigate to="content" replace />} />
        </Routes>
    );
}

export default Cart;