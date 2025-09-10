import { api } from "../Api";


export interface Cart{
    id: string;
    cartId: string;
    productId: string;
    quantity:number;
}

export const addProductToCart = async (productId:string,userId:string) =>{
    try {
        const formData = new FormData();
        formData.append("productId",productId);
        formData.append("userId",userId);
        const rest = await api.post(`/cart`,formData);
    } catch (error:any) {
        throw new Error("Impossible d'ajouter le produit. Une erreur est survenue :" + error.message);
        
    }
}