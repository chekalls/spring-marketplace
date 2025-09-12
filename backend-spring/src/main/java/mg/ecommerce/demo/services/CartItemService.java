package mg.ecommerce.demo.services;

import java.util.List;

import org.springframework.stereotype.Service;

import mg.ecommerce.demo.model.Cart;
import mg.ecommerce.demo.model.CartItem;
import mg.ecommerce.demo.model.Product;
import mg.ecommerce.demo.repository.CartItemRepository;

@Service
public class CartItemService {
    private final CartItemRepository cartItemRepository;

    public CartItemService(
        CartItemRepository cartItemRepository
    ){
        this.cartItemRepository =cartItemRepository;
    }

    // public 

    public boolean isProductInUserCart(String productId,String userId){
        return cartItemRepository.findByProductAndUser(productId,userId).isPresent();
    }

    public CartItem create(Cart cart,Product product,int quantity){
        CartItem cartItem = new CartItem();
        cartItem.setCart(cart);
        cartItem.setProduct(product);
        cartItem.setQuantity(quantity);
        return cartItemRepository.save(cartItem);
    }    
}
