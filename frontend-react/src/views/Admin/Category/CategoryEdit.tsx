import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Category, fetchCategory,uploadCategoryImage,updateCategory,getImageUrl } from "../../../utilities/CategoryUtils";

const CategoryEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const [formData, setFormData] = useState<Partial<Category>>({
    name: "",
    description: "",
    imagePath: ""
  });

  useEffect(() => {
    const loadCategory = async () => {
      try {
        setLoading(true);
        const category = await fetchCategory(Number(id));
        setFormData({
          name: category.name || "",
          description: category.description || "",
          imagePath: category.imagePath || ""
        });
        if (category.imagePath) {
          setImagePreview(getImageUrl(category.imagePath));
        }
      } catch (err: any) {
        setError(err.message || "Erreur lors du chargement de la catégorie");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadCategory();
    }
  }, [id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Vérifier le type de fichier
      if (!file.type.startsWith('image/')) {
        setError("Veuillez sélectionner un fichier image valide");
        return;
      }
      
      // Vérifier la taille du fichier (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError("L'image ne doit pas dépasser 5MB");
        return;
      }
      
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      setError("");
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
    setFormData(prev => ({ ...prev, imagePath: "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name?.trim()) {
      setError("Le nom de la catégorie est obligatoire");
      return;
    }

    try {
      setSaving(true);
      setError("");
      setSuccess("");

      let imagePath = formData.imagePath;
      
      // Upload de la nouvelle image si elle a été modifiée
      if (imageFile) {
        imagePath = await uploadCategoryImage(imageFile,Number(id));
      }

      // Mise à jour de la catégorie
      await updateCategory(Number(id), {
        ...formData,
        imagePath
      });

      setSuccess("Catégorie modifiée avec succès");
      
      // Redirection après un délai
      setTimeout(() => {
        navigate("/admin/categories");
      }, 1500);
    } catch (err: any) {
      setError(err.message || "Une erreur s'est produite lors de la modification");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement des données de la catégorie...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
          {/* En-tête */}
          <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-800 flex items-center">
                <i className="fas fa-edit text-blue-500 mr-3"></i>
                Modifier la catégorie
              </h1>
              <p className="text-gray-500 text-sm mt-1">ID: {id}</p>
            </div>
            <button
              onClick={() => navigate("/admin/categories")}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition flex items-center"
            >
              <i className="fas fa-arrow-left mr-2"></i>
              Retour
            </button>
          </div>

          {/* Messages d'alerte */}
          {error && (
            <div className="mx-6 mt-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-start">
              <i className="fas fa-exclamation-circle text-red-500 mt-1 mr-3"></i>
              <div>
                <p className="font-medium">Erreur</p>
                <p className="text-sm">{error}</p>
              </div>
              <button 
                onClick={() => setError("")}
                className="ml-auto text-red-500 hover:text-red-700"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
          )}

          {success && (
            <div className="mx-6 mt-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg flex items-start">
              <i className="fas fa-check-circle text-green-500 mt-1 mr-3"></i>
              <div>
                <p className="font-medium">Succès</p>
                <p className="text-sm">{success}</p>
              </div>
              <button 
                onClick={() => setSuccess("")}
                className="ml-auto text-green-500 hover:text-green-700"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
          )}

          {/* Formulaire */}
          <form onSubmit={handleSubmit} className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Colonne de gauche - Informations */}
              <div className="lg:col-span-2 space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Nom de la catégorie <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    placeholder="Nom de la catégorie"
                  />
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    placeholder="Description de la catégorie"
                  />
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={saving}
                    className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                  >
                    {saving ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Enregistrement...
                      </>
                    ) : (
                      <>
                        <i className="fas fa-save mr-2"></i>
                        Enregistrer les modifications
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Colonne de droite - Image */}
              <div className="lg:col-span-1">
                <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                    <i className="fas fa-image text-blue-500 mr-2"></i>
                    Image de la catégorie
                  </h3>

                  {imagePreview ? (
                    <div className="mb-4">
                      <div className="relative">
                        <img
                          src={imagePreview}
                          alt="Aperçu"
                          className="w-full h-48 object-contain rounded-lg border border-gray-300"
                        />
                        <button
                          type="button"
                          onClick={removeImage}
                          className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition"
                        >
                          <i className="fas fa-times text-xs"></i>
                        </button>
                      </div>
                      <p className="text-xs text-gray-500 mt-2 text-center">
                        Aperçu de l'image
                      </p>
                    </div>
                  ) : (
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center mb-4">
                      <i className="fas fa-cloud-upload-alt text-gray-400 text-3xl mb-2"></i>
                      <p className="text-sm text-gray-500">Aucune image sélectionnée</p>
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {imagePreview ? "Changer l'image" : "Ajouter une image"}
                    </label>
                    <label htmlFor="image-upload" className="cursor-pointer">
                      <div className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-center hover:bg-gray-50 transition">
                        <i className="fas fa-upload mr-2 text-gray-500"></i>
                        <span className="text-sm text-gray-700">Parcourir les fichiers</span>
                      </div>
                      <input
                        id="image-upload"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                    </label>
                    <p className="text-xs text-gray-500 mt-2">
                      Formats supportés: JPG, PNG, WEBP. Max: 5MB
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CategoryEdit;