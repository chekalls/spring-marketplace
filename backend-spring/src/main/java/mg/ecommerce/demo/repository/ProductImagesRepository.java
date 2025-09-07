package mg.ecommerce.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import mg.ecommerce.demo.model.ProductImages;

@Repository
public interface ProductImagesRepository extends JpaRepository<ProductImages,Long>{
    
}
