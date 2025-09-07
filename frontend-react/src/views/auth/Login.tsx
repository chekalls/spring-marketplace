import React from "react";
import { Link } from "react-router-dom";
import UserLoginForm from "../../components/Form/UserLoginForm";

const Login: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
        {/* Titre */}
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Connexion
        </h2>

        {/* Formulaire */}
        <UserLoginForm />

        {/* Lien vers inscription */}
        <p className="mt-6 text-center text-sm text-gray-600">
          Pas encore de compte ?{" "}
          <Link
            to="/auth/user/register"
            className="text-green-600 font-semibold hover:underline"
          >
            Créer un compte
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
