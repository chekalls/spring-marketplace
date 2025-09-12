package mg.ecommerce.demo.dto;

import mg.ecommerce.demo.model.CartItem;

public class CartItemDto {
    private String id;
    private String cartId;
    private String productId;
    private String userId;

    private int quantity;

    public CartItemDto() {
    }

    public CartItemDto(CartItem cartItem) {
        copyFrom(cartItem);
    }

    public void copyFrom(CartItem cartItem) {
        this.id = cartItem.getId();
        this.cartId = cartItem.getCart().getId();
        this.productId = cartItem.getProduct().getId();
        this.quantity = cartItem.getQuantity();
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getCartId() {
        return cartId;
    }

    public void setCartId(String cartId) {
        this.cartId = cartId;
    }

    public String getProductId() {
        return productId;
    }

    public void setProductId(String productId) {
        this.productId = productId;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }
}
