import React, { FormEvent, useState } from "react";
import LoginForm from "../../components/Form/AdminLoginForm";

const AdminLogin: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
        {/* Titre */}
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Connexion Administrateur
        </h2>

        {/* Formulaire */}
        <LoginForm />

      </div>
    </div>
  );
};

export default AdminLogin;
