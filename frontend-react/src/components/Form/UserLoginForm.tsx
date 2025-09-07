import React, { FormEvent, useState } from "react";
import { Link } from "react-router-dom";



const UserLoginForm: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        console.log("Login submitted:", { email, password });
    };
    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
                <label
                    htmlFor="email"
                    className="block text-sm font-semibold text-gray-600 mb-1"
                >
                    Adresse e-mail
                </label>
                <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring focus:ring-green-300 focus:outline-none"
                    placeholder="exemple@mail.com"
                />
            </div>

            {/* Mot de passe */}
            <div>
                <label
                    htmlFor="password"
                    className="block text-sm font-semibold text-gray-600 mb-1"
                >
                    Mot de passe
                </label>
                <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring focus:ring-green-300 focus:outline-none"
                    placeholder="••••••••"
                />
            </div>

            {/* Options */}
            <div className="flex items-center justify-between">
                <label className="inline-flex items-center text-sm text-gray-600">
                    <input
                        type="checkbox"
                        className="form-checkbox text-green-600 rounded"
                    />
                    <span className="ml-2">Se souvenir de moi</span>
                </label>
                <Link
                    to="/auth/forgot-password"
                    className="text-sm text-green-600 hover:underline"
                >
                    Mot de passe oublié ?
                </Link>
            </div>

            {/* Bouton */}
            <button
                type="submit"
                className="w-full bg-green-600 text-white font-semibold py-2 rounded-lg shadow-md hover:bg-green-700 transition"
            >
                Se connecter
            </button>
        </form>
    );
}

export default UserLoginForm;