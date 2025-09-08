package mg.ecommerce.demo.services;

import java.util.Optional;

import org.springframework.stereotype.Service;

import mg.ecommerce.demo.model.ProductDescription;
import mg.ecommerce.demo.model.Provider;
import mg.ecommerce.demo.repository.ProductDescriptionRepository;

@Service
public class ProductDescriptionService {
    private final ProductDescriptionRepository productDescriptionRepository;

    public ProductDescriptionService(
            ProductDescriptionRepository productDescriptionRepository) {
        this.productDescriptionRepository = productDescriptionRepository;
    }

    public void update(ProductDescription productDescription){
        productDescriptionRepository.save(productDescription);
    }

    public void update(Long productDescriptionId, String description, String marque, String codeProduit,
            Provider provider) throws Exception {
        try {
            ProductDescription productDescription = productDescriptionRepository.findById(productDescriptionId)
                    .orElseThrow(() -> new Exception("description introuvable"));
            productDescription.setDescription(description);
            productDescription.setMarque(marque);
            productDescription.setCodeProduit(codeProduit);
            productDescription.setProvider(provider);
        } catch (Exception e) {
            throw new Exception("Impossible de mettre à jour la description du produit :" + e.getMessage());
        }
    }

    public ProductDescription save(
            String description,
            String marque,
            String codeProduit,
            Provider provider) throws Exception {
        try {
            ProductDescription productDescription = new ProductDescription();
            productDescription.setDescription(description);
            productDescription.setMarque(marque);
            productDescription.setCodeProduit(codeProduit);
            productDescription.setProvider(provider);
            return productDescriptionRepository.save(productDescription);
        } catch (Exception e) {
            throw new Exception("impossible d'enregistrer la description :" + e.getMessage());
        }
    }

    public Optional<ProductDescription> findByProductId(String productId) {
        return productDescriptionRepository.findByProductId(productId);
    }

    public Optional<ProductDescription> findById(Long productDescriptionId) {
        return productDescriptionRepository.findById(productDescriptionId);
    }
}
