package mg.ecommerce.demo.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import mg.ecommerce.demo.model.ProductDescription;

@Repository
public interface ProductDescriptionRepository extends JpaRepository<ProductDescription,Long>{
    @Query("SELECT p FROM ProductDescription p WHERE p.product.id = :productId ")
    Optional<ProductDescription> findByProductId(@Param("productId") String productId);
}
