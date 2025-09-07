import Navbar from "../components/Navbars/AuthNavbar";
import registerBg from "../assets/img/register_bg_2.png";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../views/auth/Login";
import AdminLogin from "../views/auth/AdminLogin";
import Register from "../views/auth/Register";

const Auth: React.FC = () => {
    return (
        <>
            <Navbar />
            <main>
                <section className="relative w-full h-full py-40 min-h-screen">
                    <div className="absolute top-0 w-full h-full bg-blueGray-800 bg-no-repeat bg-full"
                        style={{
                            backgroundImage: `url(${registerBg})`,
                        }}>
                        <Routes>
                            <Route path="user/login" element={<Login />} />
                            <Route path="admin/login" element={<AdminLogin />} />
                            <Route path="user/register" element={<Register />} />
                            <Route index element={<Navigate to="user/login" replace />} />
                        </Routes>
                    </div>
                </section>
            </main>
        </>
    );
};

export default Auth;