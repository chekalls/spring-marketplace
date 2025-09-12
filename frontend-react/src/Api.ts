import axios from "axios";

export const API_URL = import.meta.env.VITE_API_URL;
export const API_PORT = import.meta.env.VITE_PORT;

console.log(API_URL);

export async function apiFetch(path: string, options?: RequestInit) {
    const url = `${API_URL}:${API_PORT}${path}`;
    console.log(url);
    const response = await fetch(url, options);
    if (!response.ok) throw new Error("API error");
    return response.json();
}

export const api = axios.create({
    baseURL: `${API_URL}:${API_PORT}`,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials:true
});