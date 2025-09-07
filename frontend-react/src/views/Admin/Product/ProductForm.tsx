import { FormEvent, useEffect, useState } from "react";
import { api } from "../../../Api";
import { Category,fetchCategories } from "../../../utilities/CategoryUtils";

function ProductForm() {
  const [nom, setNom] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const [images, setImages] = useState<(File | null)[]>([null, null, null]); // 3 images

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

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

  const handleImageChange = (index: number, file: File | null) => {
    const newImages = [...images];
    newImages[index] = file;
    setImages(newImages);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const formData = new FormData();
      formData.append("name", nom);
      formData.append("price", price.toString());
      formData.append("description", description);
      formData.append("categoryId", selectedCategory);

      // ajouter les images (seule la première est obligatoire)
      images.forEach((img, idx) => {
        if (img) {
          formData.append(`image${idx + 1}`, img);
        }
      });

      await api.post("/products", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setSuccess("Produit créé avec succès !");
      setNom("");
      setPrice(0);
      setDescription("");
      setSelectedCategory("");
      setImages([null, null, null]);
    } catch (err: any) {
      setError(err.response?.data?.message || "Erreur lors de la création du produit");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {error && <p className="mb-4 text-red-500">{error}</p>}
      {success && <p className="mb-4 text-green-500">{success}</p>}

      <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
        <div>
          <label htmlFor="nom" className="block mb-1 font-medium text-gray-600">
            Nom
          </label>
          <input
            type="text"
            id="nom"
            name="nom"
            placeholder="Biscuit"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <div>
          <label htmlFor="price" className="block mb-1 font-medium text-gray-600">
            Prix unitaire
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
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
            placeholder="Description du produit"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            rows={4}
          />
        </div>

        <div>
          <label htmlFor="category" className="block mb-1 font-medium text-gray-600">
            Catégorie
          </label>
          <select
            id="category"
            name="category"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full border rounded px-3 py-2"
            required
          >
            <option value="">-- Choisir une catégorie --</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* Inputs pour images */}
        <div>
          <label className="block mb-1 font-medium text-gray-600">
            Image principale (obligatoire)
          </label>
          <input
            type="file"
            accept="image/*"
            required
            onChange={(e) => handleImageChange(0, e.target.files?.[0] || null)}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full
                       file:border-0 file:text-sm file:font-semibold
                       file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-600">Image secondaire (optionnelle)</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleImageChange(1, e.target.files?.[0] || null)}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full
                       file:border-0 file:text-sm file:font-semibold
                       file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-600">Troisième image (optionnelle)</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleImageChange(2, e.target.files?.[0] || null)}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full
                       file:border-0 file:text-sm file:font-semibold
                       file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
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
    </>
  );
}

export default ProductForm;
