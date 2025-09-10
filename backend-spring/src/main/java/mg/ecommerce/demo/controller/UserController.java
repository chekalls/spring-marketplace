package mg.ecommerce.demo.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import mg.ecommerce.demo.dto.UserDto;
import mg.ecommerce.demo.model.User;
import mg.ecommerce.demo.services.UserService;
import mg.ecommerce.demo.utility.Response;
import mg.ecommerce.demo.utility.ResponseManager;

@RestController
@RequestMapping("/users")
public class UserController {
    private final UserService userService;

    public UserController(
            UserService userService) {
        this.userService = userService;
    }

    @PostMapping
    public ResponseEntity<Response> createAccount(
            @RequestBody UserDto userDto) {
        Response response = new Response();
        try {
            User newUser = userService.create(
                    userDto.getFirstName(),
                    userDto.getLastName(),
                    userDto.getEmail(),
                    userDto.getEmail(),
                    userDto.getPhone(),
                    userDto.getPassword());
            if (newUser != null) {
                ResponseManager.success(response, newUser, "utilisateur créer avec succès");
            } else {
                ResponseManager.success(response, "", "impossible de créer un utilisateur");
            }
        } catch (Exception e) {
            ResponseManager.serveurError(response);
        }
        return new ResponseEntity<>(response, response.getStatus());
    }

    @PostMapping("/login")
    public ResponseEntity<Response> login(
            @RequestBody UserDto userDto) {
        Response response = new Response();
        try {
            if (userService.login(userDto.getEmail(), userDto.getPassword())) {
                User user = userService.findByEmail(userDto.getEmail())
                        .orElseThrow(() -> new Exception("utilisateur introuvable"));
                ResponseManager.success(response, user, "connexion réussit");
                // String jwt = jwt
            } else {
                ResponseManager.success(response, "", "Email ou mot de passe incorrecte");
            }
        } catch (Exception e) {
            ResponseManager.serveurError(response);
        }

        return new ResponseEntity<>(response, response.getStatus());
    }

    @GetMapping("list/{typeUserId}")
    public ResponseEntity<Response> findByTypeUser(
            @PathVariable("typeUserId") Long typeUserId) {
        Response response = new Response();
        try {
            List<User> users = userService.findAllByTypeUser(typeUserId);
            List<UserDto> userDtos = users.stream().map(UserDto::new).toList();
            System.out.println("type user ==================================="+users.size());
            ResponseManager.success(response, userDtos, "liste récupéré avec succès");
        } catch (Exception e) {
            ResponseManager.serveurError(response);
        }
        return new ResponseEntity<>(response, response.getStatus());
    }
}
