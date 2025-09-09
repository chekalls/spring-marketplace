package mg.ecommerce.demo.dto;

import java.time.LocalDate;

import mg.ecommerce.demo.model.StockProduct;

public class StockProductDto {
    private Long id;
    private Integer quantity;
    private String serialNumber;
    private LocalDate expirationDate;
    private String productId;
    private String createdAt;
    private String updatedAt;

    public StockProductDto() {
    }

    public StockProductDto(StockProduct stockProduct) {
        copyFrom(stockProduct);
    }

    public void copyFrom(StockProduct stockProduct) {
        this.id = stockProduct.getId();
        this.quantity = stockProduct.getQuantity();
        this.serialNumber = stockProduct.getSerialNumber();
        this.expirationDate = stockProduct.getExpirationDate();
        this.productId = stockProduct.getProduct().getId();
        this.createdAt = stockProduct.getCreationDate().toString();
        this.updatedAt = stockProduct.getUpdateDate().toString();
    }

    public String getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(String updatedAt) {
        this.updatedAt = updatedAt;
    }

    public String getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(String createdAt) {
        this.createdAt = createdAt;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public String getSerialNumber() {
        return serialNumber;
    }

    public void setSerialNumber(String serialNumber) {
        this.serialNumber = serialNumber;
    }

    public LocalDate getExpirationDate() {
        return expirationDate;
    }

    public void setExpirationDate(LocalDate expirationDate) {
        this.expirationDate = expirationDate;
    }

    public String getProductId() {
        return productId;
    }

    public void setProductId(String productId) {
        this.productId = productId;
    }
}
