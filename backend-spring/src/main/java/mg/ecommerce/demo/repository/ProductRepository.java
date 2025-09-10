package mg.ecommerce.demo.repository;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import mg.ecommerce.demo.model.Product;

@Repository
public interface ProductRepository extends JpaRepository<Product,String>{
    @Query("SELECT p FROM Product p WHERE p.category.id = :categoryId")
    Page<Product> findAllPaginatedByCategory(@Param("categoryId") Long categoryId,Pageable pageable);
}