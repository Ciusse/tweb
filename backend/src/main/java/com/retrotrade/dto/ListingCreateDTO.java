package com.retrotrade.dto;

import com.retrotrade.model.ItemCondition;
import com.retrotrade.model.PackagingStatus;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.math.BigDecimal;

public class ListingCreateDTO {

    @NotBlank(message = "Il titolo è obbligatorio")
    @Size(min = 3, max = 150, message = "Il titolo deve essere compreso tra 3 e 150 caratteri")
    private String title;

    @NotBlank(message = "La descrizione è obbligatoria")
    @Size(min = 5, max = 2000, message = "La descrizione deve contenere tra 5 e 2000 caratteri")
    private String description;

    @NotNull(message = "Il prezzo è obbligatorio")
    @DecimalMin(value = "0.01", message = "Il prezzo deve essere maggiore di 0")
    private BigDecimal price;

    @NotNull(message = "La condizione dell'oggetto è obbligatoria")
    private ItemCondition itemCondition;

    @NotNull(message = "Lo stato della confezione è obbligatorio")
    private PackagingStatus packagingStatus;

    private String imageUrl;

    @NotNull(message = "L'ID della piattaforma è obbligatorio")
    private Long platformId;

    @NotNull(message = "L'ID della categoria è obbligatorio")
    private Long categoryId;

    public ListingCreateDTO() {
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

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public Long getPlatformId() {
        return platformId;
    }

    public void setPlatformId(Long platformId) {
        this.platformId = platformId;
    }

    public Long getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(Long categoryId) {
        this.categoryId = categoryId;
    }
}
