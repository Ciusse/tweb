package com.retrotrade.dto;

import com.retrotrade.model.ItemCondition;
import com.retrotrade.model.ListingStatus;
import com.retrotrade.model.PackagingStatus;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public class ListingDetailDTO {
    private Long id;
    private String title;
    private String description;
    private BigDecimal price;
    private ItemCondition itemCondition;
    private PackagingStatus packagingStatus;
    private ListingStatus status;
    private String imageUrl;
    private LocalDateTime createdAt;
    private PlatformDTO platform;
    private CategoryDTO category;
    private UserDTO seller;
    private Long orderId;

    public ListingDetailDTO() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public ItemCondition getItemCondition() {
        return itemCondition;
    }

    public void setItemCondition(ItemCondition itemCondition) {
        this.itemCondition = itemCondition;
    }

    public PackagingStatus getPackagingStatus() {
        return packagingStatus;
    }

    public void setPackagingStatus(PackagingStatus packagingStatus) {
        this.packagingStatus = packagingStatus;
    }

    public ListingStatus getStatus() {
        return status;
    }

    public void setStatus(ListingStatus status) {
        this.status = status;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public PlatformDTO getPlatform() {
        return platform;
    }

    public void setPlatform(PlatformDTO platform) {
        this.platform = platform;
    }

    public CategoryDTO getCategory() {
        return category;
    }

    public void setCategory(CategoryDTO category) {
        this.category = category;
    }

    public UserDTO getSeller() {
        return seller;
    }

    public void setSeller(UserDTO seller) {
        this.seller = seller;
    }

    public Long getOrderId() {
        return orderId;
    }

    public void setOrderId(Long orderId) {
        this.orderId = orderId;
    }
}
