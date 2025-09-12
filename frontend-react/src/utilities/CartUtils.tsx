import { api } from "../Api";


export interface Cart{
    id: string;
    cartId: string;
    productId: string;
    quantity:number;
}

export const updateItemQuantity = async (productId: string, userId: string, quantity: number) => {
    try {
        const res = await api.put(`/cart/product/${productId}`, null, {
            params: {
                userId: userId,
                quantity: quantity
            }
        });

        return res.data;
    } catch (error) {
        throw new Error("impossible de modifier la quantité");
    }
}


export const removeProductToCart = async (productId:string,userId:string)=>{
    try {
        const res = await api.delete(`/cart/product/${productId}`,{
            params:{
                userId:userId
            }
        });
    } catch (error:any) {
        throw new Error("Impossible d'ajouter le produit. Une erreur est survenue :" + error.message);
    }
}

export const addProductToCart = async (productId:string,userId:string) =>{
    try {
        const res = await api.post(`/cart`,{
            productId: productId,
            userId: userId
        });
        return res;
    } catch (error:any) {
        throw new Error("Impossible d'ajouter le produit. Une erreur est survenue :" + error.message);
    }
}
