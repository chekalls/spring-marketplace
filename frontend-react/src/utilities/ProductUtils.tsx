import { api } from "../Api";

export interface Product {
  id: number;
  name: string;
  price: number;
  quantite?: number;
  category?: string;
  createdAt?:string
};

export const fetchProduct = async(idProduct:number):Promise<Product> =>{
    try {
        const res = await api.get(`/products/${idProduct}`);
        return res.data.data;
    } catch (error) {
        throw new Error("Impossible trouver le produit. Une erreur est survenue");   
    }
};

