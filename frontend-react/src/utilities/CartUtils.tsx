import { api } from "../Api";


export interface Cart{
    id: string;
    cartId: string;
    productId: string;
    quantity:number;
}

export const addProductToCart = async (productId:string,userId:string) =>{
    console.log("product Id :"+productId);
    console.log("userId : "+userId);
    try {
        const rest = await api.post(`/cart`,{
            productId: productId,
            userId: userId
        });
    } catch (error:any) {
        throw new Error("Impossible d'ajouter le produit. Une erreur est survenue :" + error.message);
    }
}
