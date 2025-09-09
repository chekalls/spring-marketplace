import { api,API_PORT,API_URL } from "../Api";

export interface Category {
    id: number;
    name: string;
    description?: string;
    createdAt: string;
    nbProduct?:number;
    imagePath?: string;
}

export const fetchCategories = async (): Promise<Category[]> => {
    try {
        const res = await api.get("/categories");
        return res.data.data;
    } catch (error) {
        throw new Error("Impossible de récupérer les catégories. Une erreur est survenue");
    }
}

export const fetchCategory = async (idCategory:number):Promise<Category> =>{
    try {
        const res = await api.get(`/categories/${idCategory}`);
        return res.data.data;
    } catch (error) {
        throw new Error("Impossible la catégorie. Une erreur est survenue");      
    }
}

export const getImageUrl = (imagePath: string) => {
    return `${API_URL}:${API_PORT}${imagePath}`;
}