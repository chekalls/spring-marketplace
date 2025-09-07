package mg.ecommerce.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import mg.ecommerce.demo.model.Product;

@Repository
public interface ProductRepository extends JpaRepository<Product,String>{}