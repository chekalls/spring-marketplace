package mg.ecommerce.demo.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ch.qos.logback.classic.encoder.JsonEncoder;
import mg.ecommerce.demo.dto.TypeUserDto;
import mg.ecommerce.demo.model.TypeUser;
import mg.ecommerce.demo.services.TypeUserService;
import mg.ecommerce.demo.utility.Response;
import mg.ecommerce.demo.utility.ResponseManager;

@RestController
@RequestMapping("/type_user")
public class TypeUserController {
    private final TypeUserService typeUserService;

    public TypeUserController(
            TypeUserService typeUserService) {
        this.typeUserService = typeUserService;
    }

    @GetMapping("/type_client")
    public ResponseEntity<Response> findTypeClient() {
        Response response = new Response();
        try {
            TypeUser typeUser = typeUserService.findTypeClient().get();
            if (typeUser == null) {
                ResponseManager.success(response, "", "type utilisateur introuvable");
            } else {
                TypeUserDto typeUserDto = new TypeUserDto(typeUser);
                ResponseManager.success(response, typeUserDto, "type utilisateur récupéré avec succès");
            }
        } catch (Exception e) {
            ResponseManager.serveurError(response);
        }
        return new ResponseEntity<>(response, response.getStatus());
    }

    @GetMapping("/type_admin")
    public ResponseEntity<Response> findTypeAdmin() {
        Response response = new Response();
        try {
            TypeUser typeUser = typeUserService.findTypeAdmin().get();
            if (typeUser == null) {
                ResponseManager.success(response, "", "type utilisateur introuvable");
            } else {
                TypeUserDto typeUserDto = new TypeUserDto(typeUser);
                ResponseManager.success(response, typeUserDto, "type utilisateur récupéré avec succès");
            }
        } catch (Exception e) {
            ResponseManager.serveurError(response);
        }
        return new ResponseEntity<>(response, response.getStatus());
    }
}
