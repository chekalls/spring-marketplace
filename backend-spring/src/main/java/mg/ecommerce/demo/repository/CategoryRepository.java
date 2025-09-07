package mg.ecommerce.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import mg.ecommerce.demo.model.Category;

@Repository
public interface CategoryRepository extends JpaRepository<Category,Long>{
    @Query("SELECT COUNT(p) FROM Product p WHERE p.category.id = :category_id")
    int countNbProduct(@Param("category_id") Long categoryId);
}
