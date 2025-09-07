import React, { useEffect, useState } from "react";
import { api } from "../../../Api";
import { useNavigate } from "react-router-dom";

interface Product {
  id: number;
  name: string;
  price: number;
  quantite?: number;
  category?: string;
}

interface ApiResponse {
  status_code: string;
  status: string;
  message: string;
  data: any;
  multidata: {
    liste_produit: Product[];
    total_page: number;
    total_element: number;
    current_page: number;
    page_size: number;
  };
  liste_produit: Product[];
  lien: string | null;
}

const PAGE_SIZE = 10;

// --- Exemple visuel de modal (inactif) ---
const ExampleModal: React.FC<{ visible: boolean; onClose: () => void }> = ({ visible, onClose }) => {
  if (!visible) return null;
  return (
    <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80">
        <h3 className="text-lg font-bold mb-4">Confirmation (exemple)</h3>
        <p className="mb-4">Ceci est un exemple de modal, il ne fait rien.</p>
        <button
          onClick={onClose}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Fermer
        </button>
      </div>
    </div>
  );
};

const ProductList: React.FC = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [showModal, setShowModal] = useState(false); // Exemple modal

  const addProduct = () => navigate("/admin/products/form");

  const fetchProducts = async (page: number = 1) => {
    setLoading(true);
    try {
      const res = await api.get<ApiResponse>("/products", {
        params: { page: page - 1, limit: PAGE_SIZE },
      });
      const data = res.data.multidata.liste_produit || [];
      setProducts(data);
      setTotalPages(res.data.multidata?.total_page || 1);
      setCurrentPage((res.data.multidata?.current_page || 0) + 1);
    } catch (err: any) {
      setError(err.response?.data?.message || "Erreur lors de la récupération des produits");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(currentPage);
  }, [currentPage]);

  const handleEdit = (p: Product) => {
    // Exemple visuel : modal ou alert
    setShowModal(true);
    alert(`Éditer ${p.name} (exemple visuel)`); 
  };
  const handleDelete = (p: Product) => {
    // Exemple visuel : modal ou alert
    setShowModal(true);
    alert(`Supprimer ${p.name} (exemple visuel)`); 
  };

  return (
    <div className="bg-white shadow-lg rounded-xl p-6 relative">
      {/* --- Header --- */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Liste des Produits</h2>
        <button
          onClick={addProduct}
          className="bg-blue-600 text-white px-5 py-2 rounded-lg shadow hover:bg-blue-700 transition"
        >
          + Ajouter un produit
        </button>
      </div>

      {/* --- Recherche et filtres (inactifs, juste visuels) --- */}
      <div className="flex flex-wrap gap-4 mb-6 items-center">
        <input
          type="text"
          placeholder="Rechercher par nom..."
          className="border px-4 py-2 rounded-lg shadow-sm w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
        <select className="border px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300">
          <option>Tous</option>
          <option>Actifs</option>
          <option>Inactifs</option>
        </select>
      </div>

      {/* --- Contenu --- */}
      {loading ? (
        <p className="text-gray-600">Chargement des produits...</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : products.length === 0 ? (
        <p className="text-gray-500">Aucun produit trouvé.</p>
      ) : (
        <>
          <table className="min-w-full border rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-gray-100 text-left text-gray-600 uppercase text-sm">
                <th className="py-3 px-4">Nom</th>
                <th className="py-3 px-4">Prix Unitaire</th>
                <th className="py-3 px-4">Quantité</th>
                <th className="py-3 px-4">Catégorie</th>
                <th className="py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id} className="border-b hover:bg-gray-50 transition">
                  <td className="py-2 px-4">{p.name}</td>
                  <td className="py-2 px-4">{p.price/* .toLocaleString() */} Ar</td>
                  <td className="py-2 px-4">{p.quantite ?? 0}</td>
                  <td className="py-2 px-4">{p.category || "Non renseigné"}</td>
                  <td className="py-2 px-4 flex gap-3">
                    <button
                      className="text-blue-600 hover:underline"
                      onClick={() => handleEdit(p)}
                    >
                      Éditer
                    </button>
                    <button
                      className="text-red-600 hover:underline"
                      onClick={() => handleDelete(p)}
                    >
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* --- Pagination --- */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center mt-6 gap-2">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                className="px-3 py-1 border rounded-lg hover:bg-gray-100 disabled:opacity-50"
                disabled={currentPage === 1}
              >
                Précédent
              </button>
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-3 py-1 border rounded-lg hover:bg-gray-100 transition ${
                    currentPage === i + 1 ? "bg-blue-500 text-white font-semibold" : "bg-white"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                className="px-3 py-1 border rounded-lg hover:bg-gray-100 disabled:opacity-50"
                disabled={currentPage === totalPages}
              >
                Suivant
              </button>
            </div>
          )}
        </>
      )}

      {/* --- Modal d'exemple visuel --- */}
      <ExampleModal visible={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
};

export default ProductList;
