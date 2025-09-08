package mg.ecommerce.demo.services;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import mg.ecommerce.demo.model.Product;
import mg.ecommerce.demo.model.ProductImages;
import mg.ecommerce.demo.repository.ProductImagesRepository;

@Service
public class ProductImagesService {
    private final ProductImagesRepository productImagesRepository;

    public ProductImagesService(
            ProductImagesRepository productImagesRepository) {
        this.productImagesRepository = productImagesRepository;
    }

    public ProductImages save(
            Product product,
            String imagePath,
            boolean isMain,
            int sortOrder) throws Exception {
        try {
            ProductImages productImages = new ProductImages();
            productImages.setProduct(product);
            productImages.setImagePath(imagePath);
            productImages.setMain(isMain);
            productImages.setSortOrder(sortOrder);
            return productImagesRepository.save(productImages);
        } catch (Exception e) {
            throw new Exception("impossible d'enregistrer l'image : " + e.getMessage());
        }
    }

    public void delete(ProductImages productImages) {
        try {
            productImagesRepository.delete(productImages);
            System.out.println("deleting image N0:" + productImages.getId());
        } catch (Exception e) {
            throw e;
        }
    }

    public void delete(Long productImagesId) {
        try {
            productImagesRepository.deleteById(productImagesId);
            System.out.println("deleting by id image N0:" + productImagesId);

        } catch (Exception e) {
            throw e;
        }
    }

    public List<ProductImages> findByProductId(String productId) {
        return productImagesRepository.findByProductId(productId);
    }

    public Optional<ProductImages> findById(Long productImage) {
        return productImagesRepository.findById(productImage);
    }
}
