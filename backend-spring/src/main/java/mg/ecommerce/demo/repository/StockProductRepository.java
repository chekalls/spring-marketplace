package mg.ecommerce.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import mg.ecommerce.demo.model.StockProduct;

@Repository
public interface StockProductRepository extends JpaRepository<StockProduct,Long>{}
