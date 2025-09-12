import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../views/User/Home";
import Product from "../views/User/Product/Product";
import ScrollToTop from "../utilities/ScrollToTop";
import Cart from "../views/User/Cart/Cart";

const User: React.FC = () => {
    return (
        <div className="text-gray-800 font-sans min-h-screen flex flex-col">
            <Header />
            {/* Main components */}
            <main className="container mx-auto px-4 py-12 flex-1">
                <Routes>
                    <Route path="home" element={<Home />} />
                    <Route path="products/*" element={<Product />} />
                    <Route path="cart/*" element={<Cart />} />
                    <Route index element={<Navigate to="home" replace />} />
                </Routes>
            </main>

            <Footer />
        </div>
    );
};


export default User;
