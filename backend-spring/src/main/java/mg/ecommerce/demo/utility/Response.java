package mg.ecommerce.demo.utility;

import java.util.Map;

import org.springframework.http.HttpStatus;

public class Response {
    private String status_code;
    private HttpStatus status;
    private String message;
    private Object data;
    private Map<String , Object> multidata;
    private String lien;

    public Response() {

    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Object getData() {
        return data;
    }

    public void setData(Object data) {
        this.data = data;
    }

    public String getLien() {
        return lien;
    }

    public void setLien(String lien) {
        this.lien = lien;
    }

    public HttpStatus getStatus() {
        return status;
    }

    public void setStatus(HttpStatus status) {
        this.status = status;
    }

    public String getStatus_code() {
        return status_code;
    }

    public void setStatus_code(String status_code) {
        this.status_code = status_code;
    }

    public Map<String, Object> getMultidata() {
        return multidata;
    }

    public void setMultidata(Map<String, Object> multidata) {
        this.multidata = multidata;
    }
    

}