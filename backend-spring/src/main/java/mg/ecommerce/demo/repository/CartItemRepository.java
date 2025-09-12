package mg.ecommerce.demo.repository;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import mg.ecommerce.demo.model.CartItem;

@Repository
public interface CartItemRepository extends JpaRepository<CartItem, String> {
    @Query("SELECT c FROM CartItem c WHERE c.product.id = :productId AND c.cart.user.id = :userId")
    Optional<CartItem> findByProductAndUser(@Param("productId") String productId,
            @Param("userId") String userId);

    @Query("SELECT c FROM CartItem c WHERE c.cart.user.id = :userId")
    Page<CartItem> findAllPaginatedByUser(@Param("userId") String userId,Pageable pageable);

    @Transactional
    @Modifying
    @Query("DELETE FROM CartItem c WHERE c.product.id = :productId AND c.cart.user.id = :userId")
    void removeByProductAndUser(@Param("productId") String productId,@Param("userId") String userId);
}
