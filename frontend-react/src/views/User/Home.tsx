// HomePage.tsx
import React, { useEffect, useState } from "react";
import { api } from "../../Api";
import { Category,fetchCategories } from "../../utilities/CategoryUtils";

// interface Category {
//     title: string;
//     description: string;
//     iconClass: string;
//     bgClass: string;
// }


interface Product {
    name: string;
    price: string;
    oldPrice?: string;
    imageUrl: string;
    badge?: string;
}

// const categories: Category[] = [
//     { title: "Fruits & Légumes", description: "Produits frais de saison", iconClass: "fas fa-apple-alt", bgClass: "bg-red-50" },
//     { title: "Viandes & Poissons", description: "Qualité premium", iconClass: "fas fa-drumstick-bite", bgClass: "bg-orange-50" },
//     { title: "Produits Laitiers", description: "Lait, fromages, œufs", iconClass: "fas fa-cheese", bgClass: "bg-red-50" },
//     { title: "Boulangerie", description: "Pain frais et pâtisseries", iconClass: "fas fa-bread-slice", bgClass: "bg-orange-50" },
// ];

const products: Product[] = [
    { name: "Avocats Hass Bio - Pack de 4", price: "4,99 €", oldPrice: "5,89 €", imageUrl: "https://via.placeholder.com/200x160?text=Avocat", badge: "-15%" },
    { name: "Lait Entier Bio - 1L", price: "1,29 €", imageUrl: "https://via.placeholder.com/200x160?text=Lait" },
    { name: "Baguette Traditionnelle", price: "1,10 €", imageUrl: "https://via.placeholder.com/200x160?text=Pain", badge: "Nouveau" },
    { name: "Pavé de Saumon Sauvage - 300g", price: "12,50 €", imageUrl: "https://via.placeholder.com/200x160?text=Saumon" },
];

const Home: React.FC = () => {
    const [error, setError] = useState("");
    const [categories, setCategories] = useState<Category[]>([]);


    useEffect(() => {
        const loadCategories = async () => {
            try {
                const data = await fetchCategories();
                setCategories(data);
            } catch (err: any) {
                setError(err.message);
            }
        };
        loadCategories();
    }, []);
    return (
        <div className="px-4 md:px-8 lg:px-16">
            {error && <p className="mb-4 text-red-500">{error}</p>}
            {/* Categories */}
            <h2 className="text-3xl font-bold text-center mb-12 relative after:block after:w-20 after:h-1 after:bg-gradient-to-r from-primary to-secondary after:mx-auto after:mt-4">
                Nos Catégories
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                {categories.map((cat, index) => (
                    <div
                        key={index}
                        className="category-card bg-white rounded-xl shadow-md overflow-hidden transition-transform duration-300 hover:shadow-xl hover:scale-105"
                    >
                        <div className={`category-img h-48 bg-red-50 flex items-center justify-center`}>
                            <i className={`fas fa-apple-alt text-6xl text-primary category-icon`}></i>
                        </div>
                        <div className="p-6 text-center">
                            <h3 className="font-bold text-lg mb-2">{cat.name}</h3>
                            <p className="text-gray-600">{cat.description}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Featured Products */}
            <h2 className="text-3xl font-bold text-center mb-12 relative after:block after:w-20 after:h-1 after:bg-gradient-to-r from-primary to-secondary after:mx-auto after:mt-4">
                Produits Populaires
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                {products.map((prod, index) => (
                    <div
                        key={index}
                        className="product-card bg-white rounded-xl shadow-md overflow-hidden transition-transform duration-300 hover:shadow-xl hover:-translate-y-2 flex flex-col"
                    >
                        <div className="relative h-52 flex items-center justify-center bg-gradient-to-br from-red-50 to-red-100">
                            {prod.badge && (
                                <span className="absolute top-4 left-4 bg-accent text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                                    {prod.badge}
                                </span>
                            )}
                            <img
                                src={prod.imageUrl}
                                alt={prod.name}
                                className="h-40 object-contain transition-transform duration-300 hover:scale-105"
                            />
                        </div>
                        <div className="p-4 flex flex-col justify-between flex-1">
                            <h3 className="font-semibold mb-2 h-16 overflow-hidden">{prod.name}</h3>
                            <div className="flex items-center mb-3">
                                <span className="text-primary font-bold text-lg">{prod.price}</span>
                                {prod.oldPrice && (
                                    <span className="text-gray-400 text-sm line-through ml-2">{prod.oldPrice}</span>
                                )}
                            </div>
                            <div className="flex justify-between items-center mt-auto">
                                <button className="bg-primary text-white py-2 px-6 rounded-full hover:bg-accent transition duration-300">
                                    Ajouter
                                </button>
                                <button className="text-gray-400 hover:text-red-500 text-xl">
                                    <i className="far fa-heart"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;
