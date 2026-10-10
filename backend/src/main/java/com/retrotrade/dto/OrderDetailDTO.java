package com.retrotrade.dto;

import com.retrotrade.model.OrderStatus;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public class OrderDetailDTO {
    private Long id;
    private LocalDateTime orderDate;
    private BigDecimal totalPrice;
    private String shippingAddress;
    private OrderStatus status;
    private UserDTO buyer;
    private ListingSummaryDTO listing;
    private ReviewDTO review;

    public OrderDetailDTO() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDateTime getOrderDate() {
        return orderDate;
    }

    public void setOrderDate(LocalDateTime orderDate) {
        this.orderDate = orderDate;
    }

    public BigDecimal getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(BigDecimal totalPrice) {
        this.totalPrice = totalPrice;
    }

    public String getShippingAddress() {
        return shippingAddress;
    }

    public void setShippingAddress(String shippingAddress) {
        this.shippingAddress = shippingAddress;
    }

    public OrderStatus getStatus() {
        return status;
    }

    public void setStatus(OrderStatus status) {
        this.status = status;
    }

    public UserDTO getBuyer() {
        return buyer;
    }

    public void setBuyer(UserDTO buyer) {
        this.buyer = buyer;
    }

    public ListingSummaryDTO getListing() {
        return listing;
    }

    public void setListing(ListingSummaryDTO listing) {
        this.listing = listing;
    }

    public ReviewDTO getReview() {
        return review;
    }

    public void setReview(ReviewDTO review) {
        this.review = review;
    }
}
