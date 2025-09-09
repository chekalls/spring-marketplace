package mg.ecommerce.demo.services;

import java.time.LocalDate;
import java.util.List;

import org.springframework.stereotype.Service;

import mg.ecommerce.demo.model.Product;
import mg.ecommerce.demo.model.StockProduct;
import mg.ecommerce.demo.repository.StockProductRepository;

@Service
public class StockProductService {
    private final StockProductRepository stockProductRepository;

    public StockProductService(
        StockProductRepository stockProductRepository
    ){
        this.stockProductRepository = stockProductRepository;
    }

    public List<StockProduct> findByProductId(String productId){
        return stockProductRepository.findByProductId(productId);
    }

    public StockProduct save(
        Product product,
        int quantity,
        String serialNumber,
        LocalDate expirationDate
    ){
        StockProduct stockProduct = new StockProduct();
        stockProduct.setProduct(product);
        stockProduct.setQuantity(quantity);
        stockProduct.setSerialNumber(serialNumber);
        stockProduct.setExpirationDate(expirationDate);
        return stockProductRepository.save(stockProduct);
    }
}
