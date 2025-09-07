import React, { useEffect, useState } from "react";
import { api } from "../../../Api";
import { useNavigate } from "react-router-dom";


interface Category {
  id: number;
  name: string;
  description?: string;
  // productCount: number;
  // status: "active" | "inactive";
  createdAt: string;
}

const PAGE_SIZE = 10;

const CategoryList: React.FC = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "inactive">("all");
  const [currentPage, setCurrentPage] = useState<number>(1);

  const addCategory = () => {
    navigate("/admin/categories/form");
  }

  // Récupération des catégories
  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await api.get("/categories");
      setCategories(res.data.data);
    } catch (err: any) {
      setError(err.response?.data?.message || "Erreur lors de la récupération des catégories");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Filtrage et recherche
  const filteredCategories = categories.filter((c) => {
    const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase());
    // const matchesStatus = statusFilter === "all" || c.status === statusFilter;
    return matchesSearch; // on filtre uniquement par nom pour l'instant
  });

  // Remettre la page à 1 si la recherche change
  useEffect(() => {
    setCurrentPage(1);
  }, [search, statusFilter]);

  const totalPages = Math.ceil(filteredCategories.length / PAGE_SIZE);
  const paginatedCategories = filteredCategories.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const handleDetails = (c:Category)=>{
    navigate(`/admin/categories/${c.id}`);
  };

  const handleDelete = (c: Category) => alert(`Supprimer ${c.name}`);

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-700">Liste des Catégories</h2>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600" onClick={addCategory} >
          + Ajouter une catégorie
        </button>
      </div>

      {/* Filtres et recherche */}
      <div className="flex flex-wrap gap-4 mb-4 items-center">
        <input
          type="text"
          placeholder="Rechercher par nom..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-3 py-2 rounded shadow w-full md:w-1/3"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as any)}
          className="border px-3 py-2 rounded shadow"
        >
          <option value="all">Tous</option>
          <option value="active">Actifs</option>
          <option value="inactive">Inactifs</option>
        </select>
      </div>

      {loading ? (
        <p>Chargement des catégories...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <>
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-gray-100 text-left text-gray-600 uppercase text-sm">
                <th className="py-3 px-4">Nom</th>
                <th className="py-3 px-4">Description</th>
                {/* <th className="py-3 px-4">Produits</th> */}
                {/* <th className="py-3 px-4">Statut</th> */}
                <th className="py-3 px-4">Créé le</th>
                <th className="py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedCategories.map((c) => (
                <tr key={c.id} className="border-b hover:bg-gray-50">
                  <td className="py-2 px-4">{c.name}</td>
                  <td className="py-2 px-4">{c.description || "-"}</td>
                  {/* <td className="py-2 px-4">{c.productCount}</td> */}
                  {/* <td className="py-2 px-4">
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        c.status === "active"
                          ? "bg-green-100 text-green-600"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {c.status}
                    </span>
                  </td> */}
                  <td className="py-2 px-4">{new Date(c.createdAt).toLocaleDateString()}</td>
                  <td className="py-2 px-4 flex space-x-2">
                    <button
                      className="text-blue-500 hover:underline"
                      onClick={() => handleDetails(c)}
                    >
                      Détails
                    </button>
                    <button
                      className="text-red-500 hover:underline"
                      onClick={() => handleDelete(c)}
                    >
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center mt-4 space-x-2">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                className="px-3 py-1 border rounded hover:bg-gray-200"
                disabled={currentPage === 1}
              >
                Précédent
              </button>
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-3 py-1 border rounded hover:bg-gray-200 ${currentPage === i + 1 ? "bg-gray-300 font-bold" : ""
                    }`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                className="px-3 py-1 border rounded hover:bg-gray-200"
                disabled={currentPage === totalPages}
              >
                Suivant
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CategoryList;
