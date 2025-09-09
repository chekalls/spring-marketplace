import { useParams, useNavigate } from "react-router-dom";
import { Category, fetchCategory, getImageUrl } from "../../../utilities/CategoryUtils";
import { useEffect, useState } from "react";

function CategoryDetails() {
  const [category, setCategory] = useState<Category>();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const loadCategory = async () => {
      try {
        setLoading(true);
        setError("");
        const data = await fetchCategory(Number(id));
        setCategory(data);
      } catch (err: any) {
        setError(err.message || "Erreur lors du chargement de la catégorie.");
        console.error("Erreur détaillée:", err);
      } finally {
        setLoading(false);
      }
    };
    
    if (id) {
      loadCategory();
    } else {
      setError("ID de catégorie non spécifié");
      setLoading(false);
    }
  }, [id]);

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return "—";
    const date = new Date(dateStr);
    return date.toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  if (loading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="text-center">
          <div className="inline-flex items-center justify-center mb-4">
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
          <p className="text-gray-600 font-medium">Chargement des détails de la catégorie...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-6 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
            <i className="fas fa-exclamation-triangle text-red-500 text-2xl"></i>
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Erreur de chargement</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => navigate("/admin/categories")}
            className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition"
          >
            Retour à la liste
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen p-4 md:p-8 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        {/* En-tête avec breadcrumb */}
        <nav className="mb-6 flex" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <button 
                onClick={() => navigate("/admin")}
                className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-blue-600"
              >
                <i className="fas fa-home mr-2"></i>
                Admin
              </button>
            </li>
            <li>
              <div className="flex items-center">
                <i className="fas fa-chevron-right text-gray-400 text-xs"></i>
                <button 
                  onClick={() => navigate("/admin/categories")}
                  className="ml-3 text-sm font-medium text-gray-500 hover:text-blue-600"
                >
                  Catégories
                </button>
              </div>
            </li>
            <li aria-current="page">
              <div className="flex items-center">
                <i className="fas fa-chevron-right text-gray-400 text-xs"></i>
                <span className="ml-3 text-sm font-medium text-gray-400">Détails</span>
              </div>
            </li>
          </ol>
        </nav>

        <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
          {/* En-tête de la carte */}
          <div className="px-6 py-4 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                <i className="fas fa-tag text-blue-500 mr-3"></i>
                Détails de la catégorie
              </h2>
              <p className="text-gray-500 text-sm mt-1">ID: {id}</p>
            </div>
            <div className="mt-3 sm:mt-0 flex gap-2">
              <button
                onClick={() => navigate("/admin/categories")}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition flex items-center"
              >
                <i className="fas fa-arrow-left mr-2"></i>
                Retour
              </button>
              <button
                onClick={() => navigate(`/admin/categories/edit/${id}`)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition flex items-center"
              >
                <i className="fas fa-edit mr-2"></i>
                Modifier
              </button>
            </div>
          </div>

          <div className="p-6 flex flex-col lg:flex-row gap-8">
            {/* Colonne informations */}
            <div className="flex-1">
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-sm font-medium text-gray-500 mb-1">Nom</div>
                    <div className="text-lg font-semibold text-gray-800">{category?.name || "—"}</div>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-sm font-medium text-gray-500 mb-1">Produits associés</div>
                    <div className="text-lg font-semibold text-gray-800 flex items-center">
                      {category?.nbProduct || 0}
                      <span className="text-sm font-normal text-gray-500 ml-1">produit(s)</span>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg md:col-span-2">
                    <div className="text-sm font-medium text-gray-500 mb-1">Description</div>
                    <div className="text-gray-800">
                      {category?.description || (
                        <span className="text-gray-400 italic">Aucune description</span>
                      )}
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-sm font-medium text-gray-500 mb-1">Date de création</div>
                    <div className="text-gray-800">{formatDate(category?.createdAt)}</div>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-sm font-medium text-gray-500 mb-1">Dernière modification</div>
                    <div className="text-gray-800">{formatDate(category?.updatedAt)}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Colonne image */}
            <div className="lg:w-2/5 flex flex-col">
              <div className="sticky top-6">
                <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
                  <i className="fas fa-image text-blue-500 mr-2"></i>
                  Image de la catégorie
                </h3>
                
                {category?.imagePath ? (
                  <div className="border border-gray-200 rounded-xl overflow-hidden bg-gray-100">
                    <img
                      src={getImageUrl(category.imagePath)}
                      alt={category?.name}
                      className="w-full h-auto max-h-80 object-contain"
                      onError={(e) => {
                        e.currentTarget.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2YzZjZmOSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBkeT0iLjM1ZW0iIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtZmFtaWx5PSJtb25vc3BhY2UiIGZvbnQtc2l6ZT0iMjRweCIgZmlsbD0iIzk5OSI+SW1hZ2U8L3RleHQ+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGR5PSIxLjM1ZW0iIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtZmFtaWx5PSJtb25vc3BhY2UiIGZvbnQtc2l6ZT0iMTZweCIgZmlsbD0iIzk5OSI+bm90IGZvdW5kPC90ZXh0Pjwvc3ZnPg==";
                      }}
                    />
                  </div>
                ) : (
                  <div className="w-full h-64 flex flex-col items-center justify-center bg-gray-100 text-gray-400 rounded-xl border-2 border-dashed border-gray-300 p-6 text-center">
                    <i className="fas fa-image text-4xl mb-3"></i>
                    <p className="font-medium">Aucune image</p>
                    <p className="text-sm mt-1">Ajoutez une image en modifiant cette catégorie</p>
                  </div>
                )}
                
                {category?.imagePath && (
                  <div className="mt-4 text-center">
                    <a 
                      href={getImageUrl(category.imagePath)} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium inline-flex items-center"
                    >
                      <i className="fas fa-external-link-alt mr-2"></i>
                      Voir l'image en grand
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CategoryDetails;