import { useEffect, useState, useCallback } from "react";
import { api } from "../../../Api";
import { Product, getImageUrl } from "../../../utilities/ProductUtils";
import { useSearchParams } from "react-router-dom";
import ScrollToTop from "../../../utilities/ScrollToTop";

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");

  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);

  const [searchParams] = useSearchParams();
  const categoryId = searchParams.get('categoryId') || null;

  const fetchProducts = useCallback(async (params?: any): Promise<any> => {
    try {
      const res = await api.get(`/products`, { params });
      return res.data.multidata;
    } catch (error) {
      throw new Error(
        "Impossible de récupérer les produits. Veuillez réessayer plus tard."
      );
    }
  }, []);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        setError("");
        const data = await fetchProducts({
          page,
          size: 12,
          search: searchTerm,
          sort: sortBy,
          order: sortOrder,
          withDetails: false,
          categoryId: categoryId
        });
        setProducts(data.liste_produit || []);
        setTotalPages(data.total_page || 1);
        setTotalProducts(data.total_elements || 0);
      } catch (err: any) {
        setError(err.message || "Erreur lors du chargement des produits.");
        console.error("Erreur détaillée:", err);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [page, searchTerm, sortBy, sortOrder, fetchProducts]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setPage(0);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const handleSort = (field: string) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
    setPage(0);
  };

  if (loading && page === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="inline-flex items-center justify-center mb-4">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
          <p className="text-gray-600 font-medium text-lg">Chargement des produits...</p>
          <p className="text-gray-400 text-sm mt-1">Veuillez patienter</p>
        </div>
      </div>
    );
  }

  // 🔹 Erreur améliorée
  if (error && page === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-6 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
            <i className="fas fa-exclamation-triangle text-red-500 text-2xl"></i>
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Erreur de chargement</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition"
          >
            Réessayer
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
    <ScrollToTop />
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          {/* En-tête avec filtre et recherche */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Nos produits</h1>
            <p className="text-gray-600 mb-6">
              Découvrez notre sélection de {totalProducts} produit{totalProducts !== 1 ? 's' : ''}
            </p>

            <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
              {/* Barre de recherche */}
              <div className="relative w-full md:w-1/3">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i className="fas fa-search text-gray-400"></i>
                </div>
                <input
                  type="text"
                  placeholder="Rechercher un produit..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                />
              </div>

              {/* Filtres de tri */}
              <div className="flex gap-2 w-full md:w-auto">
                <select
                  value={sortBy}
                  onChange={(e) => handleSort(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                >
                  <option value="name">Nom</option>
                  <option value="price">Prix</option>
                  <option value="createdAt">Date d'ajout</option>
                </select>
                <button
                  onClick={() => handleSort(sortBy)}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-lg transition"
                >
                  <i className={`fas fa-arrow-${sortOrder === 'asc' ? 'up' : 'down'}`}></i>
                </button>
              </div>
            </div>
          </div>

          {/* Liste des produits ou état vide */}
          {products.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-sm p-8 text-center">
              <i className="fas fa-box-open text-4xl text-gray-300 mb-4"></i>
              <h3 className="text-xl font-medium text-gray-500 mb-2">Aucun produit trouvé</h3>
              <p className="text-gray-400">
                {searchTerm ?
                  `Aucun résultat pour "${searchTerm}". Essayez d'autres termes.` :
                  "Aucun produit n'est disponible pour le moment."
                }
              </p>
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
                >
                  Réinitialiser la recherche
                </button>
              )}
            </div>
          ) : (
            <>
              <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {products.map((product) => (
                  <div
                    key={product.id}
                    className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col group"
                  >
                    {/* Image produit */}
                    <div className="h-48 bg-gray-100 overflow-hidden relative">
                      {product.imagePrincipale ? (
                        <img
                          src={getImageUrl(product.imagePrincipale)}
                          alt={product.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          onError={(e) => {
                            e.currentTarget.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2YzZjZmOSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBkeT0iLjM1ZW0iIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtZmFtaWx5PSJtb25vc3BhY2UiIGZvbnQtc2l6ZT0iMjRweCIgZmlsbD0iIzk5OSI+UHJvZHVpdDwvdGV4dD48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZHk9IjEuMzVlbSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9Im1vbm9zcGFjZSIgZm9udC1zaXplPSIxNnB4IiBmaWxsPSIjOTk5Ij5pbWFnZTwvdGV4dD48L3N2Zz4=";
                          }}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
                          <i className="fas fa-image text-3xl text-gray-300"></i>
                        </div>
                      )}
                      {/* Badge de statut */}
                      {/* {!product.available && ( */}
                      {!true && (
                        <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">
                          Rupture
                        </span>
                      )}
                    </div>

                    {/* Infos produit */}
                    <div className="p-4 flex flex-col flex-grow">
                      <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-sm text-gray-600 mb-4 flex-grow line-clamp-3">
                        {product.description || "Aucune description disponible"}
                      </p>
                      <div className="mt-auto flex justify-between items-center">
                        <span className="text-lg font-bold text-green-600">
                          {product.price ? `${product.price.toLocaleString()} Ar` : "N/C"}
                        </span>
                        <button
                          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
                        // disabled={!product.available}
                        >
                          <i className="fas fa-cart-plus mr-2"></i>
                          Ajouter
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination améliorée */}
              {totalPages > 1 && (
                <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <p className="text-gray-600 text-sm">
                    Affichage de {products.length} produit{products.length !== 1 ? 's' : ''} sur {totalProducts}
                  </p>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setPage(prev => Math.max(prev - 1, 0))}
                      disabled={page === 0}
                      className={`px-4 py-2 rounded-lg flex items-center ${page === 0
                          ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                          : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300"
                        }`}
                    >
                      <i className="fas fa-chevron-left mr-2 text-xs"></i>
                      Précédent
                    </button>

                    <div className="hidden sm:flex items-center space-x-1">
                      {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                        // Logique pour afficher les numéros de page pertinents
                        let pageNum;
                        if (page < 3) pageNum = i;
                        else if (page > totalPages - 4) pageNum = totalPages - 5 + i;
                        else pageNum = page - 2 + i;

                        if (pageNum >= 0 && pageNum < totalPages) {
                          return (
                            <button
                              key={pageNum}
                              onClick={() => setPage(pageNum)}
                              className={`w-10 h-10 rounded-lg ${page === pageNum
                                  ? "bg-blue-600 text-white"
                                  : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
                                }`}
                            >
                              {pageNum + 1}
                            </button>
                          );
                        }
                        return null;
                      })}

                      {totalPages > 5 && (
                        <span className="px-2 text-gray-500">...</span>
                      )}
                    </div>

                    <button
                      onClick={() => setPage(prev => Math.min(prev + 1, totalPages - 1))}
                      disabled={page === totalPages - 1}
                      className={`px-4 py-2 rounded-lg flex items-center ${page === totalPages - 1
                          ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                          : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300"
                        }`}
                    >
                      Suivant
                      <i className="fas fa-chevron-right ml-2 text-xs"></i>
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductList;