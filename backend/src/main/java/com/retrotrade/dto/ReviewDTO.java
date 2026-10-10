package com.retrotrade.dto;

import java.time.LocalDateTime;

public class ReviewDTO {
    private Long id;
    private Integer rating;
    private String comment;
    private LocalDateTime createdAt;
    private String authorUsername;
    private String targetUsername;
    private Long orderId;

    public ReviewDTO() {
    }

    public ReviewDTO(Long id, Integer rating, String comment, LocalDateTime createdAt, String authorUsername, String targetUsername, Long orderId) {
        this.id = id;
        this.rating = rating;
        this.comment = comment;
        this.createdAt = createdAt;
        this.authorUsername = authorUsername;
        this.targetUsername = targetUsername;
        this.orderId = orderId;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public String getAuthorUsername() {
        return authorUsername;
    }

    public void setAuthorUsername(String authorUsername) {
        this.authorUsername = authorUsername;
    }

    public String getTargetUsername() {
        return targetUsername;
    }

    public void setTargetUsername(String targetUsername) {
        this.targetUsername = targetUsername;
    }

    public Long getOrderId() {
        return orderId;
    }

    public void setOrderId(Long orderId) {
        this.orderId = orderId;
    }
}
