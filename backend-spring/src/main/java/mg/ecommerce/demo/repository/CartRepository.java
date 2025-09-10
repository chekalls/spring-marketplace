package mg.ecommerce.demo.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import mg.ecommerce.demo.model.Cart;

@Repository
public interface CartRepository extends JpaRepository<Cart,String>{
    @Query("SELECT c FROM Cart c WHERE c.user.id = :userId ")
    Optional<Cart> findByUserId(@Param("userId") String userId);
}