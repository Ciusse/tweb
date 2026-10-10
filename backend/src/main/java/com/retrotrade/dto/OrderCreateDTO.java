package com.retrotrade.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class OrderCreateDTO {

    @NotNull(message = "L'ID dell'annuncio è obbligatorio")
    private Long listingId;

    @NotBlank(message = "L'indirizzo di spedizione è obbligatorio")
    @Size(min = 10, max = 255, message = "L'indirizzo deve essere compreso tra 10 e 255 caratteri")
    private String shippingAddress;

    public OrderCreateDTO() {
    }

    public OrderCreateDTO(Long listingId, String shippingAddress) {
        this.listingId = listingId;
        this.shippingAddress = shippingAddress;
    }

    public Long getListingId() {
        return listingId;
    }

    public void setListingId(Long listingId) {
        this.listingId = listingId;
    }

    public String getShippingAddress() {
        return shippingAddress;
    }

    public void setShippingAddress(String shippingAddress) {
        this.shippingAddress = shippingAddress;
    }
}
