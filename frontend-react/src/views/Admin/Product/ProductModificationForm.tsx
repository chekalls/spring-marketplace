import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Product, fetchProduct, getImageUrl } from "../../../utilities/ProductUtils";
import { fetchCategories, Category } from "../../../utilities/CategoryUtils";
import { api } from "../../../Api";

type ImageType = File | string | null;

function EditProduct() {
  const [product, setProduct] = useState<Product>({
    id: "",
    name: "",
    categoryId: 0,
    price: 0,
    description: "",
    imagePrincipale: "",
    imagesSecondaire: [],
    isInCart:false,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [images, setImages] = useState<ImageType[]>([null, null, null]);
  const { id } = useParams();
  const navigate = useNavigate();

  const handleImageChange = (index: number, file: File | null) => {
    const newImages = [...images];
    newImages[index] = file;
    setImages(newImages);
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const productData = await fetchProduct(String(id));
        setProduct(productData);
        setImages([productData.imagePrincipale || null, ...(productData.imagesSecondaire || []).slice(0, 2)]);
        const categoriesData = await fetchCategories();
        setCategories(categoriesData);
      } catch (err: any) {
        setError(err.message || "Erreur lors du chargement des données.");
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const categoryId = parseInt(e.target.value);
    setProduct((prev) => ({ ...prev, categoryId }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("name", product.name);
      formData.append("description", String(product.description));
      formData.append("categoryId", String(product.categoryId));
      formData.append("price",String(product.price));

      images.forEach((img, index) => {
        if (img instanceof File) formData.append(`image${index + 1}`, img);
      });

      const response = await api.put(`/products/${product.id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.status === 200) {
        alert("Produit modifié avec succès !");
        navigate(`/admin/products/${id}`);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Erreur lors de la modification du produit");
    } finally {
      setLoading(false);
    }
  };

  const getImageSrc = (img: ImageType): string => {
    if (!img) return '';
    if (typeof img === 'string') return getImageUrl(img);
    return URL.createObjectURL(img);
  };

  if (loading) return <p className="text-gray-500 text-center mt-10">Chargement du produit...</p>;
  if (error) return <p className="text-red-500 text-center mt-10">{error}</p>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Modifier le produit</h2>

      <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-2xl p-8 flex flex-col md:flex-row gap-8">
        {/* --- Images --- */}
        <div className="md:w-1/3 flex flex-col gap-6">
          {/* Image principale */}
          <div>
            <label className="block font-semibold mb-2">Image principale</label>
            {images[0] && (
              <img
                src={getImageSrc(images[0])}
                alt={product.name}
                className="rounded-xl w-full h-48 object-cover shadow-md mb-2"
              />
            )}
            <input
              type="file"
              accept="image/*"
              className="mt-1 block w-full text-sm"
              onChange={(e) => handleImageChange(0, e.target.files?.[0] || null)}
            />
          </div>

          {/* Images secondaires */}
          <div>
            <label className="block font-semibold mb-2">Images secondaires</label>
            <div className="grid grid-cols-2 gap-3 mb-2">
              {[1, 2].map((arrayIndex) => (
                <div key={arrayIndex}>
                  {images[arrayIndex] && (
                    <img
                      src={getImageSrc(images[arrayIndex])}
                      alt={`Image secondaire ${arrayIndex + 1}`}
                      className="w-full h-24 object-cover rounded-lg shadow-sm mb-1"
                    />
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    className="block w-full text-xs"
                    onChange={(e) => handleImageChange(arrayIndex, e.target.files?.[0] || null)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* --- Infos produit --- */}
        <div className="md:w-2/3 flex flex-col gap-6">
          <div>
            <label className="block font-semibold mb-1">Nom *</label>
            <input
              type="text"
              name="name"
              value={product.name}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
              required
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Prix unitaire *</label>
            <input
              type="number"
              name="price"
              value={product.price}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
              required  
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Catégorie *</label>
            <select
              value={product.categoryId}
              onChange={handleCategoryChange}
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
              required
            >
              <option value="0">-- Choisir une catégorie --</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-semibold mb-1">Description *</label>
            <textarea
              name="description"
              value={product.description}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2 h-32 focus:outline-none focus:ring-2 focus:ring-blue-300"
              required
            />
          </div>

          {/* --- Boutons --- */}
          <div className="flex justify-end gap-4 mt-6">
            <button
              type="button"
              onClick={() => navigate(`/admin/products/${id}`)}
              className="px-5 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition disabled:opacity-50"
            >
              {loading ? "Sauvegarde..." : "Sauvegarder"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default EditProduct;
