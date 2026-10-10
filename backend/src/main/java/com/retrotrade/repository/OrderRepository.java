package com.retrotrade.repository;

import com.retrotrade.model.Order;
import com.retrotrade.model.OrderStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {

    @Query("SELECT o FROM Order o " +
           "JOIN FETCH o.listing l " +
           "JOIN FETCH o.buyer b " +
           "WHERE b.id = :buyerId " +
           "AND (:status IS NULL OR o.status = :status) " +
           "ORDER BY o.orderDate DESC")
    List<Order> findByBuyerIdAndStatus(
            @Param("buyerId") Long buyerId,
            @Param("status") OrderStatus status
    );

    @Query("SELECT o FROM Order o " +
           "JOIN FETCH o.listing l " +
           "JOIN FETCH o.buyer b " +
           "WHERE l.seller.id = :sellerId " +
           "ORDER BY o.orderDate DESC")
    List<Order> findBySellerId(@Param("sellerId") Long sellerId);

    @Query("SELECT COALESCE(SUM(o.totalPrice), 0) FROM Order o WHERE o.status != com.retrotrade.model.OrderStatus.CANCELLED")
    BigDecimal calculateTotalGrossVolume();

    long countByStatus(OrderStatus status);
}
