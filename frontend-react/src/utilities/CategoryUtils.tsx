import { api, API_PORT, API_URL } from "../Api";

export interface Category {
    id: number;
    name: string;
    description?: string;
    createdAt: string;
    updatedAt?: string;
    nbProduct?: number;
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

export const fetchCategory = async (idCategory: number): Promise<Category> => {
    try {
        const res = await api.get(`/categories/${idCategory}`);
        return res.data.data;
    } catch (error) {
        throw new Error("Impossible la catégorie. Une erreur est survenue");
    }
};

export const getImageUrl = (imagePath: string) => {
    return `${API_URL}:${API_PORT}${imagePath}`;
};

export const uploadCategoryImage = async (imageFile: File, categoryId: Number): Promise<string> => {
    try {
        const formData = new FormData();
        formData.append("image", imageFile);
        const res = await api.put(`/categories/image/${categoryId}`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        return res.data.message;
    } catch (error: any) {
        throw new Error("Impossible de modifier l'image. Une erreur est survenue :" + error.message);

    }
};

export const updateCategory = async (categoryId: Number, data: any) => {
    try {
        const res = await api.put(`/categories/${categoryId}`, data);
    } catch (error: any) {
        throw new Error("Impossible de modifier les informations. Une erreur est survenue :" + error.message);

    }
}