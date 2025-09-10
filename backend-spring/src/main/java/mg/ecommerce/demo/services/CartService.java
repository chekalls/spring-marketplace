package mg.ecommerce.demo.services;

import org.springframework.stereotype.Service;

import mg.ecommerce.demo.model.Cart;
import mg.ecommerce.demo.model.User;
import mg.ecommerce.demo.repository.CartRepository;

@Service
public class CartService {
    private final CartRepository cartRepository;

    public CartService(
        CartRepository cartRepository
    ){
        this.cartRepository = cartRepository;
    }

    public Cart create(User user){
        Cart cart = new Cart();
        cart.setUser(user);
        return cartRepository.save(cart);
    }
}
