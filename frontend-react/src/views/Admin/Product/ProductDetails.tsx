import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Product, fetchProduct } from "../../../utilities/ProductUtils";

// function ProductDetails(){
//     return (
//         <>Details d'un produit</>
//     )
// };

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
        console.log("data ====================" + data);
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
    return <p className="text-gray-500">Chargement du produit...</p>;
  }

  if (error) {
    return <p className="text-red-500 font-medium">{error}</p>;
  }

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 shadow-lg rounded-2xl">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Détails du produit
      </h2>

      <div className="divide-y divide-gray-200">
        <div className="py-2">
          <span className="font-semibold">Nom :</span> {product?.name}
        </div>
        <div className="py-2">
          <span className="font-semibold">Catégorie :</span>{" "}
          {product?.category}
        </div>
        <div className="py-2">
          <span className="font-semibold">Prix unitaire :</span>{" "}
          <span className="text-green-600 font-medium">
            {product?.price} Ar
          </span>
        </div>
        <div className="py-2">
          <span className="font-semibold">Date d’acquisition :</span>{" "}
          {product?.createdAt}
        </div>
        <div className="py-2">
          <span className="font-semibold">Détails :</span>{" "}
          {product?.description}
        </div>
      </div>

      <div className="mt-6 flex justify-end space-x-3">
        {/* <button
          onClick={() => navigate("/admin/products")}
          className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg transition"
        >
          Retour
        </button> */}
        <button
          onClick={() => navigate(`/admin/products/edit/${id}`)}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition"
        >
          Modifier
        </button>
      </div>
    </div>
  );
}

export default ProductDetails;
