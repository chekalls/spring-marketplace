

export const getConnectedUser = ():string =>{
    return String(sessionStorage.getItem("userId"));    
}