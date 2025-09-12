import { api, API_PORT, API_URL } from "../Api";

export interface Product {
    id: string;
    name: string;
    price: number;
    quantity?: number;
    categoryId?: number;
    category?: string;
    description?: string;
    createdAt?: string
    imagePrincipale?: string;
    imagesSecondaire?: string[];
    isInCart: boolean;
};

export interface ProductPage{
    liste_produit: Product[];
    current_page:number;
    total_page:number;
    page_size:number;
    total_element:number;
}

export interface StockProduct {
    id: number;
    quantity: number;
    serialNumber?: string;
    expirationDate?: string;
    productId: string;
    createdAt?: string;
    updatedAt?: string;
}

export const getUserCartProduct = async (userId: string):Promise<ProductPage> => {
    try {
        const res = await api.get(`/cart/user/${userId}`);
        return res.data.multidata;
    } catch (error) {
        throw new Error("Impossible de récupérer les produit. Une erreur est survenue");
    }
}

export const isInCart = async (productId: string, userId: string): Promise<boolean> => {
    try {

        return false;
    } catch (error) {
        throw new Error("Impossible de récupérer les produit. Une erreur est survenue");
    }
}

export const fetchProducts = async (data: any): Promise<Product[]> => {
    try {
        const res = await api.get(`/products`, data);
        return res.data.multidata.liste_produit;
    } catch (error) {
        throw new Error("Impossible de récupérer les produit. Une erreur est survenue");
    }
}

export const fetchProduct = async (idProduct: string): Promise<Product> => {
    try {
        const res = await api.get(`/products/${idProduct}`);
        return res.data.data;
    } catch (error) {
        throw new Error("Impossible trouver le produit. Une erreur est survenue");
    }
};

export const getImageUrl = (imagePath: string) => {
    return `${API_URL}:${API_PORT}${imagePath}`;
}

export const getProductStock = async (idProduct: string): Promise<StockProduct[]> => {
    try {
        const res = await api.get(`stock/${idProduct}`);
        return res.data.data;
    } catch (error) {
        throw new Error("Impossible de récupérer le détails de son stock. Une erreur est survenue");
    }
}