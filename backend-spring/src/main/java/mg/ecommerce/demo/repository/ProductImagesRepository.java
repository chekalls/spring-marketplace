package mg.ecommerce.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import mg.ecommerce.demo.model.ProductImages;

@Repository
public interface ProductImagesRepository extends JpaRepository<ProductImages,Long>{
    @Query("SELECT p FROM ProductImages p WHERE p.product.id = :productId")
    List<ProductImages> findByProductId(@Param("productId") String productId);
}
