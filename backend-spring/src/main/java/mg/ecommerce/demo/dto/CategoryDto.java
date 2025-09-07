package mg.ecommerce.demo.dto;

import java.time.LocalDateTime;

import mg.ecommerce.demo.model.Category;

public class CategoryDto {
    private Long id;
    private String name;
    private String description;
    private LocalDateTime createdAt;
    private int nbProduct;

    public CategoryDto() {
    }

    public CategoryDto(Category category) {
        copyFrom(category);
    }

    public void copyFrom(Category category) {
        this.id = category.getId();
        this.name = category.getName();
        this.description = (category.getDescription() != null) ? category.getDescription() : "";
        this.createdAt = category.getCreationDate();
    }

    public int getNbProduct() {
        return nbProduct;
    }

    public void setNbProduct(int nbProduct) {
        this.nbProduct = nbProduct;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
