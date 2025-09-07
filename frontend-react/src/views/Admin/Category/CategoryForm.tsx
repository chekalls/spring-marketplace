import { FormEvent, useState } from "react";
import { api } from "../../../Api";

function CategoryForm() {
  const [nom, setNom] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await api.post("/categories", {
        name:nom,
        description:description,
      });
      setSuccess("Catégorie créée avec succès !");
      setNom("");
      setDescription("");
      console.log(res.data);
    } catch (err: any) {
      setError(err.response?.data?.message || "Erreur lors de la création");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-700">Créer une catégorie</h2>

      {error && <p className="mb-4 text-red-500">{error}</p>}
      {success && <p className="mb-4 text-green-500">{success}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="nom" className="block mb-1 font-medium text-gray-600">
            Nom
          </label>
          <input
            type="text"
            id="nom"
            name="nom"
            placeholder="Matériel Informatique"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <div>
          <label htmlFor="description" className="block mb-1 font-medium text-gray-600">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            placeholder="Description de la catégorie"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            rows={4}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded transition-colors disabled:opacity-50"
        >
          {loading ? "Création..." : "Créer"}
        </button>
      </form>
    </div>
  );
}

export default CategoryForm;
