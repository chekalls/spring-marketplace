package mg.ecommerce.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import mg.ecommerce.demo.model.StockProduct;

@Repository
public interface StockProductRepository extends JpaRepository<StockProduct,Long>{
    
    @Query("SELECT s FROM StockProduct s WHERE s.product.id = :productId ")
    List<StockProduct> findByProductId(@Param("productId") String productId);
}
