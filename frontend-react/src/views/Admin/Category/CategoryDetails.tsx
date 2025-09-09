import { useParams, useNavigate } from "react-router-dom";
import { Category, fetchCategory,getImageUrl } from "../../../utilities/CategoryUtils";
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
        const data = await fetchCategory(Number(id));
        setCategory(data);
      } catch (err: any) {
        setError(err.message || "Erreur lors du chargement de la catégorie.");
      } finally {
        setLoading(false);
      }
    };
    loadCategory();
  }, [id]);

  if (loading) {
    return <p className="text-gray-500">Chargement de la catégorie...</p>;
  }

  if (error) {
    return <p className="text-red-500 font-medium">{error}</p>;
  }

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-2xl">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        Détails de la catégorie
      </h2>

      <div className="space-y-2 text-gray-700">
        <p>
          <span className="font-semibold">ID :</span> {id}
        </p>
        <p>
          <span className="font-semibold">Nom :</span> {category?.name}
        </p>
        <p>
          <span className="font-semibold">Description :</span>{" "}
          {category?.description || "—"}
        </p>
        <p>
          <span className="font-semibold">Date de création :</span>{" "}
          {category?.createdAt}
        </p>
        <p>
          <span className="font-semibold">Produits liés :</span>{" "}
          {category?.nbProduct}
        </p>
        <p>
          <span>Representation :</span>
          <img src={getImageUrl(String(category?.imagePath))} alt="" />
        </p>
      </div>

      <div className="mt-6 flex justify-end">
        <button
          onClick={() => navigate(`/admin/categories/edit/${id}`)}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition"
        >
          Modifier la catégorie
        </button>
      </div>
    </div>
  );
}

export default CategoryDetails;