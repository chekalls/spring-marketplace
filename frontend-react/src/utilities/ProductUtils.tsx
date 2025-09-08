import { api,API_PORT,API_URL } from "../Api";

export interface Product {
  id: string;
  name: string;
  price: number;
  quantite?: number;
  categoryId?:number;
  category?: string;
  description?:string;
  createdAt?:string
  imagePrincipale?:string;
  imagesSecondaire?:string[];
};

export const fetchProduct = async(idProduct:string):Promise<Product> =>{
    try {
        const res = await api.get(`/products/${idProduct}`);
        return res.data.data;
    } catch (error) {
        throw new Error("Impossible trouver le produit. Une erreur est survenue");   
    }
};

export const getImageUrl = (imagePath:string) =>{
    return `${API_URL}:${API_PORT}${imagePath}`;
}