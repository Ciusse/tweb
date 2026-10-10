package com.retrotrade.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class OrderCancelDTO {

    @NotBlank(message = "La motivazione dell'annullamento è obbligatoria")
    @Size(min = 5, max = 255, message = "La motivazione deve essere compresa tra 5 e 255 caratteri")
    private String reason;

    public OrderCancelDTO() {
    }

    public OrderCancelDTO(String reason) {
        this.reason = reason;
    }

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }
}
