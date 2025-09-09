// HomePage.tsx
import React, { useEffect, useState } from "react";
import { Category, fetchCategories, getImageUrl } from "../../utilities/CategoryUtils";

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
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* En-tête avec style amélioré */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4 relative inline-block">
                        Nos Catégories
                        <span className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"></span>
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Découvrez notre sélection de produits soigneusement organisée pour vous offrir la meilleure expérience d'achat.
                    </p>
                </div>

                {/* Grille de catégories améliorée */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {categories.map((cat, index) => (
                        <div
                            key={cat.id || index}
                            className="group bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 relative"
                        >
                            {/* Image de la catégorie avec effet de survol */}
                            <div className="h-56 overflow-hidden relative">
                                {cat.imagePath ? (
                                    <img
                                        src={getImageUrl(String(cat.imagePath))}
                                        alt={cat.name}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        onError={(e) => {
                                            e.currentTarget.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2YzZjZmOSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBkeT0iLjM1ZW0iIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtZmFtaWx5PSJtb25vc3BhY2UiIGZvbnQtc2l6ZT0iMjRweCIgZmlsbD0iIzk5OSI+Q2F0ZWdvcnk8L3RleHQ+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGR5PSIxLjM1ZW0iIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtZmFtaWx5PSJtb25vc3BhY2UiIGZvbnQtc2l6ZT0iMTZweCIgZmlsbD0iIzk5OSI+aW1hZ2U8L3RleHQ+PC9zdmc+";
                                        }}
                                    />
                                ) : (
                                    <div className="w-full h-full bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
                                        <i className="fas fa-image text-4xl text-gray-300"></i>
                                    </div>
                                )}
                                {/* Badge nombre de produits */}
                                {cat?.nbProduct || 0 > 0 && (
                                    <span className="absolute top-4 right-4 bg-white bg-opacity-90 text-gray-800 text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
                                        {cat.nbProduct} produit{cat.nbProduct !== 1 ? 's' : ''}
                                    </span>
                                )}
                            </div>

                            {/* Contenu texte */}
                            <div className="p-6 text-center">
                                <h3 className="font-bold text-xl text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                                    {cat.name}
                                </h3>
                                <p className="text-gray-600 line-clamp-2 h-12 overflow-hidden">
                                    {cat.description || "Aucune description disponible"}
                                </p>

                                {/* Bouton d'action */}
                                <button className="mt-5 px-5 py-2 bg-transparent border border-blue-500 text-blue-600 rounded-lg font-medium transition-all duration-300 group-hover:bg-blue-500 group-hover:text-white">
                                    Voir les produits
                                    <i className="fas fa-arrow-right ml-2 transform group-hover:translate-x-1 transition-transform"></i>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Indicateur de chargement ou état vide */}
                {categories.length === 0 && (
                    <div className="text-center py-16">
                        <i className="fas fa-folder-open text-5xl text-gray-300 mb-4"></i>
                        <h3 className="text-xl font-medium text-gray-500 mb-2">Aucune catégorie disponible</h3>
                        <p className="text-gray-400">Les catégories apparaîtront ici une fois ajoutées.</p>
                    </div>
                )}
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
