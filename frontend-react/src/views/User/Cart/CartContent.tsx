import { useEffect, useState } from "react";
import { getUserCartProduct, Product, getImageUrl } from "../../../utilities/ProductUtils";
import { getConnectedUser } from "../../../utilities/UserUtils";
import { updateItemQuantity } from "../../../utilities/CategoryUtils";

const CartContent: React.FC = () => {
    const PAGE_SIZE = 15;
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");
    const userId = getConnectedUser();

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const res = await getUserCartProduct(userId, {
                params: { page: 0, size: PAGE_SIZE }
            });
            setProducts(res.liste_produit || []);
        } catch (err: any) {
            setError(err.response?.data?.message || "Erreur lors de la récupération des produits");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleDelete = async (productId: string) => {
        console.log("Supprimer", productId);
        // Ici tu peux appeler ton API pour supprimer l'article
        // puis rappeler fetchProducts() pour rafraîchir la liste
    };

    const handleQuantityChange = async (productId: string, newQuantity: number) => {
        newQuantity = Math.max(0, newQuantity);
        try {
            await updateItemQuantity(productId, userId, newQuantity);

            setProducts(prevProducts =>
                prevProducts.map(product =>
                    product.id === productId
                        ? { ...product, quantity: newQuantity } 
                        : product
                )
            );
        } catch (err: any) {
            console.error("Erreur lors de la mise à jour de la quantité", err);
        }
    };

    const totalCartPrice = products.reduce((sum, p) => sum + (p.price ?? 0) * (p.quantity ?? 0), 0);

    if (loading) {
        return (
            <div className="flex justify-center items-center py-12">
                <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (error) {
        return <p className="text-red-500 text-center py-12">{error}</p>;
    }

    if (products.length === 0) {
        return (
            <div className="text-center py-16 text-gray-500">
                <i className="fas fa-shopping-cart text-5xl mb-4"></i>
                <p>Aucun produit dans votre panier</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((p) => (
                <div
                    key={p.id}
                    className="bg-white rounded-xl shadow-md overflow-hidden transition-transform duration-300 hover:shadow-xl hover:-translate-y-2 flex flex-col"
                >
                    <div className="relative h-52 flex items-center justify-center bg-gray-100">
                        {p.imagePrincipale && (
                            <img
                                src={getImageUrl(p.imagePrincipale)}
                                alt={p.name}
                                className="h-40 object-contain transition-transform duration-300 hover:scale-105"
                            />
                        )}
                    </div>
                    <div className="p-4 flex flex-col flex-1">
                        <h3 className="font-semibold mb-2 line-clamp-2 h-14">{p.name}</h3>
                        <p className="text-gray-600 mb-2 line-clamp-3 flex-1">
                            {p.description || "Aucune description disponible"}
                        </p>

                        <div className="flex justify-between items-center mb-2">
                            <span className="text-lg font-bold text-green-600">{p.price?.toLocaleString()} Ar</span>
                            <button
                                onClick={() => handleDelete(p.id)}
                                className="text-red-600 hover:text-red-500"
                            >
                                <i className="fas fa-trash-alt"></i>
                            </button>
                        </div>

                        <div className="flex justify-between items-center mt-auto">
                            <div className="flex items-center border rounded-lg overflow-hidden">
                                <button
                                    className="px-3 py-1 bg-gray-200 hover:bg-gray-300 transition"
                                    onClick={() => handleQuantityChange(p.id, (p.quantity || 0) - 1)}
                                >
                                    -
                                </button>
                                <span className="px-4">{p.quantity ?? 0}</span>
                                <button
                                    className="px-3 py-1 bg-gray-200 hover:bg-gray-300 transition"
                                    onClick={() => handleQuantityChange(p.id, (p.quantity || 0) + 1)}
                                >
                                    +
                                </button>
                            </div>
                            <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition">
                                Acheter
                            </button>
                        </div>
                    </div>
                </div>
            ))}

            {/* Total panier */}
            <div className="col-span-full mt-6 text-right text-xl font-bold text-gray-800">
                Total : {totalCartPrice.toLocaleString()} Ar
            </div>
        </div>
    );
}

export default CartContent;
