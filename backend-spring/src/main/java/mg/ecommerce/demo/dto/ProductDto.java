package mg.ecommerce.demo.dto;

import java.time.LocalDateTime;
import java.util.Set;

import mg.ecommerce.demo.model.Category;
import mg.ecommerce.demo.model.Product;
import mg.ecommerce.demo.model.ProductDescription;
import mg.ecommerce.demo.model.ProductImages;

public class ProductDto {
    private String id;
    private String name;
    private String description;
    private String marque;
    private String codeProduit;
    private String provider;
    private Long categoryId;
    private String category;
    private double price;
    private LocalDateTime createdAt;
    private String imagePrincipale;

    public String getImagePrincipale() {
        return imagePrincipale;
    }

    public void setImagePrincipale(String imagePrincipale) {
        this.imagePrincipale = imagePrincipale;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public ProductDto(Product product) {
        copyFrom(product, false);
    }

    public ProductDto(Product product, boolean withDetails) {
        copyFrom(product, withDetails);
    }

    public ProductDto() {
    }

    public Long getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(Long categoryId) {
        this.categoryId = (categoryId != null) ? categoryId : null;
    }

    public void copyFrom(Product product, boolean withDetails) {
        this.id = product.getId();
        this.name = product.getName();
        this.createdAt = product.getCreationDate();
        this.price = product.getPrice();
        if (product.getCategory() != null) {
            Category category = product.getCategory();
            this.categoryId = category.getId();
            this.category = category.getName();
        }
        if (withDetails) {
            ProductDescription productDescription = (product.getProductDescription() != null)
                    ? product.getProductDescription()
                    : null;
            if (productDescription != null) {
                this.description = productDescription.getDescription();
                this.marque = productDescription.getMarque();
                this.codeProduit = productDescription.getCodeProduit();
                this.provider = (productDescription.getProvider() != null) ? productDescription.getProvider().getName()
                        : null;
            }
        }
        if (product.getProductImages() != null) {
            Set<ProductImages> productImages = product.getProductImages();
            this.imagePrincipale = productImages.stream().filter(ProductImages::isMain).findFirst().orElse(null)
                    .getImagePath();
                
        }

    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getMarque() {
        return marque;
    }

    public void setMarque(String marque) {
        this.marque = marque;
    }

    public String getCodeProduit() {
        return codeProduit;
    }

    public void setCodeProduit(String codeProduit) {
        this.codeProduit = codeProduit;
    }

    public String getProvider() {
        return provider;
    }

    public void setProvider(String provider) {
        this.provider = provider;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

}
