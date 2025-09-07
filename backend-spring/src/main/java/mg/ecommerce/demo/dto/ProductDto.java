package mg.ecommerce.demo.dto;

import java.time.LocalDateTime;

import mg.ecommerce.demo.model.Category;
import mg.ecommerce.demo.model.Product;

public class ProductDto {
    private String id;
    private String name;
    private String description;
    private Long categoryId;
    private String category;

    private LocalDateTime createdAt;

    public ProductDto(Product product) {
        copyFrom(product);
    }

    public ProductDto() {
    }

    public Long getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(Long categoryId) {
        this.categoryId = (categoryId != null) ? categoryId : null;
    }

    public void copyFrom(Product product) {
        this.id = product.getId();
        this.name = product.getName();
        this.description = product.getDescription();
        this.createdAt = product.getCreationDate();
        if(product.getCategory()!=null){
            Category category = product.getCategory();
            this.categoryId = category.getId();
            this.category = category.getName();
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

}
