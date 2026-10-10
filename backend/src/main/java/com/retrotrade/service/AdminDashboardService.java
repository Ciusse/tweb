package com.retrotrade.service;

import com.retrotrade.dto.AdminMetricsDTO;
import com.retrotrade.model.ListingStatus;
import com.retrotrade.model.OrderStatus;
import com.retrotrade.repository.ListingRepository;
import com.retrotrade.repository.OrderRepository;
import com.retrotrade.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;

@Service
@Transactional(readOnly = true)
public class AdminDashboardService {

    private final ListingRepository listingRepository;
    private final OrderRepository orderRepository;
    private final UserRepository userRepository;

    public AdminDashboardService(ListingRepository listingRepository,
                                 OrderRepository orderRepository,
                                 UserRepository userRepository) {
        this.listingRepository = listingRepository;
        this.orderRepository = orderRepository;
        this.userRepository = userRepository;
    }

    public AdminMetricsDTO getMetrics() {
        BigDecimal totalGross = orderRepository.calculateTotalGrossVolume();
        long totalListings = listingRepository.count();
        long availableListings = listingRepository.countByStatus(ListingStatus.AVAILABLE);
        long soldListings = listingRepository.countByStatus(ListingStatus.SOLD);
        long totalOrders = orderRepository.count();
        long pendingOrders = orderRepository.countByStatus(OrderStatus.PENDING);
        long registeredUsers = userRepository.count();

        return new AdminMetricsDTO(
                totalGross,
                totalListings,
                availableListings,
                soldListings,
                totalOrders,
                pendingOrders,
                registeredUsers
        );
    }
}
