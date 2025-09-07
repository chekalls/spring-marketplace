import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiFetch } from "../../Api";

function LoginForm() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        console.log("Admin Login submitted:", { email, password });

        try {
            const response = await apiFetch("/users/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email,
                    password,
                }),
            });

            console.log("réponse du serveur" + response);
            if (response.data.id /* && response.token */) {
                // localStorage.setItem("token", response.token);

                // Redirection vers le dashboard
                navigate("/admin/dashboard");
            } else {
                setError("Email ou mot de passe incorrect");
            }

        } catch (err) {
            console.error(err);
            alert("Erreur serveur : " + err);
        }
    };
    return (
        <>
            {/* Bloc d'erreur */}
            {error && (
                <div className="mb-4 p-3 bg-red-100 text-red-700 border border-red-200 rounded">
                    {error}
                </div>
            )}

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
                        className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring focus:ring-blue-300 focus:outline-none"
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
                        className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring focus:ring-blue-300 focus:outline-none"
                        placeholder="••••••••"
                    />
                </div>

                {/* Bouton */}
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg shadow-md hover:bg-blue-700 transition"
                >
                    Se connecter
                </button>
            </form>
        </>
    );
};


export default LoginForm;
