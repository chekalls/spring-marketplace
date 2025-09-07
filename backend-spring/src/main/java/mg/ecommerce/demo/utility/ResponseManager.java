package mg.ecommerce.demo.utility;

import org.springframework.http.HttpStatus;

public class ResponseManager {
    public static void serveurError(Response response) {
        response.setStatus(HttpStatus.INTERNAL_SERVER_ERROR);
        response.setStatus_code("500");
        response.setMessage("une erreur est survenue de la part du serveur");
    }

    public static void success(Response response,Object data,String message){
        response.setData(data);
        response.setStatus(HttpStatus.OK);
        response.setStatus_code("200");
        response.setMessage(message);
    }

    public static void resourceUnavaible(Response response,String message){
        response.setStatus(HttpStatus.NOT_FOUND);
        response.setStatus_code("404");
        response.setMessage(message);
    }
}
