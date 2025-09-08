import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Product, fetchProduct, getImageUrl } from "../../../utilities/ProductUtils";

function ProductDetails() {
  const [product, setProduct] = useState<Product>();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true);
        const data = await fetchProduct(String(id));
        setProduct(data);
      } catch (err: any) {
        setError(err.message || "Erreur lors du chargement du produit.");
      } finally {
        setLoading(false);
      }
    };
    loadProduct();
  }, [id]);

  if (loading) {
    return <p className="text-gray-500 text-center mt-10">Chargement du produit...</p>;
  }

  if (error) {
    return <p className="text-red-500 font-medium text-center mt-10">{error}</p>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Détails du produit
      </h2>

      <div className="bg-white shadow-lg rounded-2xl p-6 flex flex-col md:flex-row gap-6">
        {/* --- Image principale --- */}
        <div className="md:w-1/3 flex flex-col gap-4">
          {product?.imagePrincipale && (
            <img
              src={getImageUrl(String(product?.imagePrincipale))}
              alt={product?.name}
              className="rounded-xl w-full object-cover shadow-md"
            />
          )}
          {/* Images secondaires */}
          {(product?.imagesSecondaire || []).length > 0 && (
            <div className="flex flex-wrap gap-2">
              {(product?.imagesSecondaire || []).map((img, idx) => (
                <img
                  key={idx}
                  src={getImageUrl(img)}
                  alt={`Image secondaire ${idx + 1}`}
                  className="w-20 h-20 object-cover rounded-lg shadow-sm"
                />
              ))}
            </div>
          )}
        </div>

        {/* --- Détails --- */}
        <div className="md:w-2/3 flex flex-col justify-between">
          <div className="space-y-3 text-gray-700">
            <div>
              <span className="font-semibold">Nom :</span> {product?.name}
            </div>
            <div>
              <span className="font-semibold">Catégorie :</span> {product?.category}
            </div>
            <div>
              <span className="font-semibold">Prix unitaire :</span>{" "}
              <span className="text-green-600 font-medium">{product?.price} Ar</span>
            </div>
            <div>
              <span className="font-semibold">Date d’acquisition :</span> {product?.createdAt}
            </div>
            <div>
              <span className="font-semibold">Détails :</span> {product?.description || "—"}
            </div>
          </div>

          {/* --- Boutons --- */}
          <div className="mt-6 flex justify-end gap-3">
            <button
              onClick={() => navigate("/admin/products")}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg transition"
            >
              Retour
            </button>
            <button
              onClick={() => navigate(`/admin/products/edit/${id}`)}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition"
            >
              Modifier
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
