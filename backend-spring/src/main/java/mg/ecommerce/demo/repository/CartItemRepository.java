package mg.ecommerce.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import mg.ecommerce.demo.model.CartItem;

@Repository
public interface CartItemRepository extends JpaRepository<CartItem,String>{
    
}
