import React, { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { apiFetch } from "../../Api";

const Register: React.FC = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [address, setAddress] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Les mots de passe ne correspondent pas");
      return;
    }

    try {

      let typeUser = (await apiFetch("/type_user/type_client",{
        method: "GET",
        headers: { "Content-Type": "application/json" },
      })).data;

      console.log(typeUser);
    
      const data = await apiFetch("/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, lastName, email, phone, password, address,typeUserId: typeUser.id }),
      });

    } catch (err) {
      console.error(err);
      alert("Erreur serveur" + err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
        {/* Titre */}
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Créer un compte
        </h2>

        {/* Formulaire */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Nom */}
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1">
              Prénom
            </label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              placeholder="Prénom"
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring focus:ring-green-300 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1">
              Nom
            </label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              placeholder="Nom"
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring focus:ring-green-300 focus:outline-none"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1">
              Adresse e-mail
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="exemple@mail.com"
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring focus:ring-green-300 focus:outline-none"
            />
          </div>

          {/* Téléphone */}
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1">
              Téléphone
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="0612345678"
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring focus:ring-green-300 focus:outline-none"
            />
          </div>

          {/* Adresse */}
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1">
              Adresse
            </label>
            <input
              type="text"                     // type correct pour une adresse
              value={address}                 // state correct
              onChange={(e) => setAddress(e.target.value)}
              placeholder="123 Rue Exemple, Antananarivo"
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring focus:ring-green-300 focus:outline-none"
            />
          </div>


          {/* Mot de passe */}
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1">
              Mot de passe
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring focus:ring-green-300 focus:outline-none"
            />
          </div>

          {/* Confirmer mot de passe */}
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1">
              Confirmer le mot de passe
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              placeholder="••••••••"
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring focus:ring-green-300 focus:outline-none"
            />
          </div>

          {/* Bouton */}
          <button
            type="submit"
            className="w-full bg-green-600 text-white font-semibold py-2 rounded-lg shadow-md hover:bg-green-700 transition"
          >
            Créer mon compte
          </button>
        </form>

        {/* Lien vers connexion */}
        <p className="mt-6 text-center text-sm text-gray-600">
          Déjà un compte ?{" "}
          <Link to="/auth/user/login" className="text-green-600 font-semibold hover:underline">
            Se connecter
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
