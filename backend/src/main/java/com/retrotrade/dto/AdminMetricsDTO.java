package com.retrotrade.dto;

import java.math.BigDecimal;

public class AdminMetricsDTO {
    private BigDecimal totalGrossVolume;
    private long totalListings;
    private long availableListings;
    private long soldListings;
    private long totalOrders;
    private long pendingOrders;
    private long registeredUsers;

    public AdminMetricsDTO() {
    }

    public AdminMetricsDTO(BigDecimal totalGrossVolume, long totalListings, long availableListings,
                           long soldListings, long totalOrders, long pendingOrders, long registeredUsers) {
        this.totalGrossVolume = totalGrossVolume;
        this.totalListings = totalListings;
        this.availableListings = availableListings;
        this.soldListings = soldListings;
        this.totalOrders = totalOrders;
        this.pendingOrders = pendingOrders;
        this.registeredUsers = registeredUsers;
    }

    public BigDecimal getTotalGrossVolume() {
        return totalGrossVolume;
    }

    public void setTotalGrossVolume(BigDecimal totalGrossVolume) {
        this.totalGrossVolume = totalGrossVolume;
    }

    public long getTotalListings() {
        return totalListings;
    }

    public void setTotalListings(long totalListings) {
        this.totalListings = totalListings;
    }

    public long getAvailableListings() {
        return availableListings;
    }

    public void setAvailableListings(long availableListings) {
        this.availableListings = availableListings;
    }

    public long getSoldListings() {
        return soldListings;
    }

    public void setSoldListings(long soldListings) {
        this.soldListings = soldListings;
    }

    public long getTotalOrders() {
        return totalOrders;
    }

    public void setTotalOrders(long totalOrders) {
        this.totalOrders = totalOrders;
    }

    public long getPendingOrders() {
        return pendingOrders;
    }

    public void setPendingOrders(long pendingOrders) {
        this.pendingOrders = pendingOrders;
    }

    public long getRegisteredUsers() {
        return registeredUsers;
    }

    public void setRegisteredUsers(long registeredUsers) {
        this.registeredUsers = registeredUsers;
    }
}
