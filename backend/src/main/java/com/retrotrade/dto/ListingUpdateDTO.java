package com.retrotrade.dto;

import com.retrotrade.model.ItemCondition;
import com.retrotrade.model.ListingStatus;
import com.retrotrade.model.PackagingStatus;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Size;

import java.math.BigDecimal;

public class ListingUpdateDTO {

    @Size(min = 3, max = 150, message = "Il titolo deve essere compreso tra 3 e 150 caratteri")
    private String title;

    @Size(min = 5, max = 2000, message = "La descrizione deve contenere tra 5 e 2000 caratteri")
    private String description;

    @DecimalMin(value = "0.01", message = "Il prezzo deve essere maggiore di 0")
    private BigDecimal price;

    private ItemCondition itemCondition;
    private PackagingStatus packagingStatus;
    private ListingStatus status;
    private String imageUrl;

    public ListingUpdateDTO() {
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
}
