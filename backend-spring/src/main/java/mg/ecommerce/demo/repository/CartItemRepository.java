package mg.ecommerce.demo.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import mg.ecommerce.demo.model.CartItem;

@Repository
public interface CartItemRepository extends JpaRepository<CartItem, String> {
    @Query("SELECT c FROM CartItem c WHERE c.product.id = :productId AND c.cart.user.id = :userId")
    Optional<CartItem> findByProductAndUser(@Param("productId") String productId,
            @Param("userId") String userId);
}
