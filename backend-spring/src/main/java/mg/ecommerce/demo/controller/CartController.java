package mg.ecommerce.demo.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import mg.ecommerce.demo.dto.CartItemDto;
import mg.ecommerce.demo.model.Cart;
import mg.ecommerce.demo.model.CartItem;
import mg.ecommerce.demo.model.Product;
import mg.ecommerce.demo.model.TypeUser;
import mg.ecommerce.demo.model.User;
import mg.ecommerce.demo.requestDto.CartRequest;
import mg.ecommerce.demo.services.CartItemService;
import mg.ecommerce.demo.services.CartService;
import mg.ecommerce.demo.services.ProductService;
import mg.ecommerce.demo.services.TypeUserService;
import mg.ecommerce.demo.services.UserService;
import mg.ecommerce.demo.utility.Response;
import mg.ecommerce.demo.utility.ResponseManager;

@RestController
@RequestMapping("/cart")
public class CartController {
    private final CartService cartService;
    private final CartItemService cartItemService;
    private final UserService userService;
    private final ProductService productService;
    private final TypeUserService typeUserService;

    public CartController(
            CartService cartService,
            CartItemService cartItemService,
            UserService userService,
            ProductService productService,
            TypeUserService typeUserService) {
        this.cartService = cartService;
        this.cartItemService = cartItemService;
        this.userService = userService;
        this.productService = productService;
        this.typeUserService = typeUserService;
    }


    @GetMapping("/user/{userId}")
    public ResponseEntity<Response> getCartContent(
        @PathVariable("userId") String userId
    ){
        Response response = new Response();
        try {
            // List<Product> products = cartItemService.
        } catch (Exception e) {
            ResponseManager.serveurError(response);
        }
        return new ResponseEntity<>(response,response.getStatus());
    }
 
    @GetMapping("/product/{idProduct}")
    public ResponseEntity<Response> idProductInCart(
        @PathVariable("idProduct") String productId,
        @RequestParam("userId") String userId
    ){
        Response response = new Response();
        try {
            boolean exists = cartItemService.isProductInUserCart(productId, userId);
            ResponseManager.success(response, exists, userId);
        } catch (Exception e) {
            ResponseManager.serveurError(response);
        }
        return new ResponseEntity<>(response,response.getStatus());
    }

    @PostMapping
    @Transactional
    public ResponseEntity<Response> addToCart(
            @RequestBody CartRequest request,
            @RequestParam(name = "quantity", defaultValue = "1") Integer quantity) {
        Response response = new Response();
        try {
            Cart userCart = cartService.findByUserId(request.getUserId())
                    .orElse(null);

            if (userCart == null) {
                User user = userService.findById(request.getUserId())
                        .orElse(null);
                if (user == null) {
                    ResponseManager.resourceUnavaible(response, "Utilisateur introuvable");
                    return new ResponseEntity<>(response, response.getStatus());
                }else{
                    TypeUser typeUser = typeUserService.findTypeClient().get();
                    if (user.getTypeUser().getId() == typeUser.getId()) {
                        userCart = cartService.create(user);
                    }
                }
            }

            Product product = productService.findById(request.getProductId())
                    .orElse(null);
            if (product == null) {
                ResponseManager.resourceUnavaible(response, "Produit introuvable");
            } else {
                CartItem cartItem = cartItemService.create(userCart, product, quantity);
                ResponseManager.success(response, new CartItemDto(cartItem),
                        "Produit ajouté avec succès dans le panier");
            }

        } catch (Exception e) {
            ResponseManager.serveurError(response);
            response.setMessage(e.getMessage());
        }
        return new ResponseEntity<>(response, response.getStatus());
    }

}
