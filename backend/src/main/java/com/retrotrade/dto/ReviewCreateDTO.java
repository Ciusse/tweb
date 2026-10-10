package com.retrotrade.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class ReviewCreateDTO {

    @NotNull(message = "Il punteggio rating è obbligatorio")
    @Min(value = 1, message = "Il voto minimo è 1 stella")
    @Max(value = 5, message = "Il voto massimo è 5 stelle")
    private Integer rating;

    @Size(max = 1000, message = "Il commento non può superare 1000 caratteri")
    private String comment;

    public ReviewCreateDTO() {
    }

    public ReviewCreateDTO(Integer rating, String comment) {
        this.rating = rating;
        this.comment = comment;
    }

    public Integer getRating() {
        return rating;
    }

    public void setRating(Integer rating) {
        this.rating = rating;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }
}
