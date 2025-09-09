import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Product, StockProduct, fetchProduct, getImageUrl, getProductStock } from "../../../utilities/ProductUtils";
import { api } from "../../../Api";

function ProductDetails() {
  const [product, setProduct] = useState<Product>();
  const [stockProducts, setStockProducts] = useState<StockProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [restockQty, setRestockQty] = useState<number>(0);
  const [expirationDate, setExpirationDate] = useState<string>("");
  const [restockLoading, setRestockLoading] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const [productData, stockData] = await Promise.all([
          fetchProduct(String(id)),
          getProductStock(String(id))
        ]);
        setProduct(productData);
        setStockProducts(stockData);
      } catch (err: any) {
        setError(err.message || "Erreur lors du chargement du produit.");
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [id]);

  const handleRestock = async () => {
    if (!id || restockQty <= 0) return;
    try {
      setRestockLoading(true);
      await api.post(`/stock/${id}`, {
        quantity: restockQty,
        expirationDate: expirationDate || null
      });

      // Mise à jour locale
      setProduct(prev => prev ? { ...prev, quantity: (prev.quantity || 0) + restockQty } : prev);
      setStockProducts(prev => [
        ...prev,
        { quantity: restockQty, expirationDate, createdAt: new Date().toISOString() } as StockProduct
      ]);

      setRestockQty(0);
      setExpirationDate("");
    } catch (err: any) {
      alert(err.message || "Impossible de réapprovisionner le stock.");
    } finally {
      setRestockLoading(false);
    }
  };

  if (loading) return <p className="text-gray-500 text-center mt-10">Chargement du produit...</p>;
  if (error) return <p className="text-red-500 font-medium text-center mt-10">{error}</p>;

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* --- Card produit --- */}
      <div className="bg-white shadow-lg rounded-2xl p-6 flex flex-col md:flex-row gap-6">
        <div className="md:w-1/3 flex flex-col gap-4">
          {product?.imagePrincipale && (
            <img
              src={getImageUrl(String(product?.imagePrincipale))}
              alt={product?.name}
              className="rounded-xl w-full object-cover shadow-md"
            />
          )}
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

        <div className="md:w-2/3 space-y-3 text-gray-700">
          <div><span className="font-semibold">Nom :</span> {product?.name}</div>
          <div><span className="font-semibold">Catégorie :</span> {product?.category}</div>
          <div>
            <span className="font-semibold">Prix unitaire :</span>{" "}
            <span className="text-green-600 font-medium">{product?.price} Ar</span>
          </div>
          <div><span className="font-semibold">Date d’acquisition :</span> {product?.createdAt}</div>
          <div><span className="font-semibold">Détails :</span> {product?.description || "—"}</div>
          <div><span className="font-semibold">Quantité en stock :</span>{" "}
            <span className="font-bold">{product?.quantity ?? 0}</span>
          </div>

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

      {/* --- Card réapprovisionnement --- */}
      <div className="bg-white shadow-lg rounded-2xl p-6 space-y-3">
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Réapprovisionnement du stock</h3>
        <div className="flex flex-wrap items-center gap-3">
          <input
            type="number"
            min={1}
            value={restockQty}
            onChange={e => setRestockQty(Number(e.target.value))}
            className="border rounded-lg px-3 py-2 w-32"
            placeholder="Quantité"
          />
          <input
            type="date"
            value={expirationDate}
            onChange={e => setExpirationDate(e.target.value)}
            className="border rounded-lg px-3 py-2 w-40"
          />
          <button
            onClick={handleRestock}
            disabled={restockLoading}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition disabled:opacity-50"
          >
            {restockLoading ? "Mise à jour..." : "Réapprovisionner"}
          </button>
        </div>
      </div>

      {/* --- Card historique du stock --- */}
      <div className="bg-white shadow-lg rounded-2xl p-6 space-y-4">
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Historique du stock</h3>
        {stockProducts.length === 0 ? (
          <p className="text-gray-500">Aucun stock enregistré.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200 text-left">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 font-medium text-gray-700">Quantité</th>
                  <th className="px-4 py-2 font-medium text-gray-700">Date d'acquisition</th>
                  <th className="px-4 py-2 font-medium text-gray-700">Date d'expiration</th>
                  <th className="px-4 py-2 font-medium text-gray-700">État</th>
                </tr>
              </thead>
              <tbody>
                {stockProducts.map((stock, idx) => {
                  const today = new Date();
                  const expiration = stock.expirationDate ? new Date(stock.expirationDate) : null;
                  let status = "Valide";
                  let statusColor = "text-green-600";

                  if (expiration) {
                    if (expiration < today) {
                      status = "Expiré";
                      statusColor = "text-red-600 font-bold";
                    } else if ((expiration.getTime() - today.getTime()) / (1000 * 3600 * 24) <= 7) {
                      status = "Proche expiration";
                      statusColor = "text-yellow-600 font-semibold";
                    }
                  }

                  return (
                    <tr key={idx} className="border-b border-gray-200 hover:bg-gray-50 transition">
                      <td className="px-4 py-2">{stock.quantity}</td>
                      <td className="px-4 py-2">{new Date(String(stock.createdAt)).toLocaleDateString()}</td>
                      <td className="px-4 py-2">{stock.expirationDate ? new Date(stock.expirationDate).toLocaleDateString() : "—"}</td>
                      <td className={`px-4 py-2 ${statusColor}`}>{status}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
}

export default ProductDetails;
