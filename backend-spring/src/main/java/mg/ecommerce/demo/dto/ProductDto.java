package mg.ecommerce.demo.dto;

import java.time.LocalDateTime;

import mg.ecommerce.demo.model.Category;
import mg.ecommerce.demo.model.Product;
import mg.ecommerce.demo.model.ProductDescription;

public class ProductDto {
    private String id;
    private String name;
    private String description;
    private String marque;
    private String codeProduit;
    private String provider;
    private Long categoryId;
    private String category;
    private LocalDateTime createdAt;

    public ProductDto(Product product){
        copyFrom(product,false);
    }

    public ProductDto(Product product,boolean withDetails) {
        copyFrom(product,withDetails);
    }

    public ProductDto() {
    }

    public Long getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(Long categoryId) {
        this.categoryId = (categoryId != null) ? categoryId : null;
    }

    public void copyFrom(Product product,boolean withDetails) {
        this.id = product.getId();
        this.name = product.getName();
        this.createdAt = product.getCreationDate();
        if(product.getCategory()!=null){
            Category category = product.getCategory();
            this.categoryId = category.getId();
            this.category = category.getName();
        }
        if(withDetails){
            ProductDescription productDescription = product.getProductDescription();
            this.description = productDescription.getDescription();
            this.marque = productDescription.getMarque();
            this.codeProduit = productDescription.getCodeProduit();
            this.provider = productDescription.getProvider().getName();
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
