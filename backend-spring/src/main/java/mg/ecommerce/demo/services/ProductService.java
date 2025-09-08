package mg.ecommerce.demo.services;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import mg.ecommerce.demo.dto.ProductDto;
import mg.ecommerce.demo.model.Product;
import mg.ecommerce.demo.repository.ProductRepository;

@Service
public class ProductService {
    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public Optional<Product> findById(String productId) {
        return productRepository.findById(productId);
    }

    public Page<Product> findAllPaginated(int page, int size, boolean withDetails) {
        Pageable pageable = PageRequest.of(page, size);
        if (!withDetails) {
            return productRepository.findAll(pageable);
        }
        return productRepository.findAll(pageable);
        // return products.map(product -> {
        // ProductDto dto = new ProductDto();
        // dto.copyFrom(product);
        // return dto;
        // });
    }

    public List<ProductDto> findAll() {
        return productRepository.findAll()
                .stream()
                .map(ProductDto::new)
                .toList();
    }

    public String save(Product product) {
        String newId = this.productRepository.save(product).getId();
        product.setId(newId);
        return newId;
    }

    public void update(Product product){
        productRepository.save(product);
    }

    public String save(
            String name,
            double price,
            Long categoryId) {
        return "";
    }

}
