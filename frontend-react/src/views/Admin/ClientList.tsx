import React, { useEffect, useState } from "react";
import { apiFetch } from "../../Api";
import { HttpStatusCode } from "axios";

interface Client {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  created_at: string;
}

const ClientList: React.FC = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const [selectedClients, setSelectedClients] = useState<Set<string>>(new Set());

  const fetchClients = async () => {
    try {
      let typeUser = (await apiFetch("/type_user/type_client", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      })).data;

      if (!typeUser?.id) throw new Error("Type utilisateur invalide");

      const response = await apiFetch(`/users/list/${typeUser.id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (response.status_code!=HttpStatusCode.Ok) throw new Error("Erreur lors de la récupération "+HttpStatusCode.Ok);
      console.log(response.data);
      const clientsData = response.data || [];

      const data: Client[] = clientsData.map((c: any) => ({
        id: c.id,
        firstName: c.firstName,
        lastName: c.lastName,
        email: c.email,
        phone: c.phone,
        creted_at: c.created_at,
      }));

      setClients(data);
    } catch (err: any) {
      setError(err.message || "Erreur inconnue");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const toggleSelectClient = (id: string) => {
    setSelectedClients((prev) => {
      const newSet = new Set(prev);
      newSet.has(id) ? newSet.delete(id) : newSet.add(id);
      return newSet;
    });
  };

  const selectAll = () => {
    if (selectedClients.size === clients.length) setSelectedClients(new Set());
    else setSelectedClients(new Set(clients.map((c) => c.id)));
  };

  if (loading) return (
    <div className="flex justify-center items-center py-12">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
    </div>
  );

  if (error) return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
      <div className="flex items-center">
        <i className="fas fa-exclamation-circle text-red-500 mr-3"></i>
        <p className="text-red-700">{error}</p>
      </div>
    </div>
  );

  return (
    <div className="overflow-hidden rounded-lg shadow-sm border border-gray-200">
      <div className="bg-white p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Gestion des Clients</h2>
        
        <div className="overflow-x-auto">
          <table className="w-full min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="w-12 px-4 py-3 text-left">
                  <input
                    type="checkbox"
                    onChange={selectAll}
                    checked={selectedClients.size === clients.length && clients.length > 0}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nom
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Prénom
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Téléphone
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date création
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {clients.map((client) => (
                <tr
                  key={client.id}
                  className={`hover:bg-gray-50 transition-colors ${
                    selectedClients.has(client.id) ? "bg-blue-50" : ""
                  }`}
                >
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={selectedClients.has(client.id)}
                      onChange={() => toggleSelectClient(client.id)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </td>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">
                    {client.lastName}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    {client.firstName}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    {client.email}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    {client.phone || "-"}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    {/* {new Date(client.created_at).toLocaleDateString('fr-FR')} */}
                    {client.created_at}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <div className="flex space-x-2">
                      <button
                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-lg text-sm transition-colors flex items-center"
                        onClick={() => alert(`Éditer: ${client.firstName} ${client.lastName}`)}
                      >
                        <i className="fas fa-edit mr-1 text-xs"></i>
                        Éditer
                      </button>
                      <button
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-sm transition-colors flex items-center"
                        onClick={() => alert(`Supprimer: ${client.firstName} ${client.lastName}`)}
                      >
                        <i className="fas fa-trash mr-1 text-xs"></i>
                        Supprimer
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ClientList;