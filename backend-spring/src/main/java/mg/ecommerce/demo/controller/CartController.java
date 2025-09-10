package mg.ecommerce.demo.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import mg.ecommerce.demo.dto.CartItemDto;
import mg.ecommerce.demo.model.Cart;
import mg.ecommerce.demo.model.CartItem;
import mg.ecommerce.demo.model.Product;
import mg.ecommerce.demo.model.User;
import mg.ecommerce.demo.services.CartItemService;
import mg.ecommerce.demo.services.CartService;
import mg.ecommerce.demo.services.ProductService;
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

    public CartController(
            CartService cartService,
            CartItemService cartItemService,
            UserService userService,
            ProductService productService) {
        this.cartService = cartService;
        this.cartItemService = cartItemService;
        this.userService = userService;
        this.productService = productService;
    }

    @PostMapping
    @Transactional
    public ResponseEntity<Response> addToCart(
            @RequestParam("productId") String productId,
            @RequestParam("userId") String userId,
            @RequestParam(name = "quantity", defaultValue = "1") Integer quantity) {
        Response response = new Response();
        try {
            Cart userCart = cartService.findByUserId(userId).get();
            if (userCart == null) {
                User user = userService.findById(userId).get();
                if (user.getTypeUser().getId() == 1) {
                    userCart = cartService.create(user);
                }
            }
            Product product = productService.findById(productId).get();
            if (product == null) {
                ResponseManager.resourceUnavaible(response, "produit introuvable");
            } else {
                CartItem cartItem = cartItemService.create(userCart, product, quantity);
                ResponseManager.success(response, new CartItemDto(cartItem) , "produit ajouter avec succès dans le panier");
            }

        } catch (Exception e) {
            ResponseManager.serveurError(response);
        }
        return new ResponseEntity<>(response, response.getStatus());
    }
}
