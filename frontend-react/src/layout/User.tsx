import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../views/User/Home";

const User: React.FC = () => {
    return (
        <div className="text-gray-800 font-sans min-h-screen flex flex-col">
            <Header />

            {/* Hero Section - Correction de la marge */}
            <section className="relative bg-gradient-to-r from-primary to-secondary text-white pt-16 pb-20 md:pt-24 md:pb-32">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight md:leading-snug">
                        Des produits frais livrés à votre porte
                    </h1>
                    <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto text-white/90">
                        Économisez jusqu'à 30% sur votre première commande avec le code <span className="font-semibold">BIENVENUE</span>
                    </p>
                    <a
                        href="#"
                        className="inline-block bg-white text-primary font-bold py-4 px-10 rounded-full shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
                    >
                        Commander maintenant
                    </a>
                </div>
            </section>

            {/* Main components */}
            <main className="container mx-auto px-4 py-12 flex-1">
                <Routes>
                    <Route path="home" element={<Home />} />
                    <Route index element={<Navigate to="home" replace />} />
                </Routes>
            </main>

            <Footer />
        </div>
    );
};


export default User;
