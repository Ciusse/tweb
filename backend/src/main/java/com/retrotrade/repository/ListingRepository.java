package com.retrotrade.repository;

import com.retrotrade.model.Listing;
import com.retrotrade.model.ListingStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface ListingRepository extends JpaRepository<Listing, Long> {

    List<Listing> findBySellerIdOrderByCreatedAtDesc(Long sellerId);

    @Query(value = """
            SELECT l.* FROM listing l
            JOIN app_user s ON s.id = l.seller_id
            JOIN platform p ON p.id = l.platform_id
            JOIN category c ON c.id = l.category_id
            WHERE (CAST(:status AS varchar) IS NULL OR l.status = CAST(:status AS varchar))
              AND (:platformId IS NULL OR l.platform_id = :platformId)
              AND (:categoryId IS NULL OR l.category_id = :categoryId)
              AND (CAST(:condition AS varchar) IS NULL OR l.item_condition = CAST(:condition AS varchar))
              AND (:maxPrice   IS NULL OR l.price        <= :maxPrice)
              AND (CAST(:search AS varchar) IS NULL OR (l.title ILIKE '%' || CAST(:search AS varchar) || '%' OR l.description ILIKE '%' || CAST(:search AS varchar) || '%'))
            ORDER BY l.created_at DESC
            """, nativeQuery = true)
    List<Listing> searchListings(
            @Param("status")     String status,
            @Param("platformId") Long platformId,
            @Param("categoryId") Long categoryId,
            @Param("condition")  String condition,
            @Param("maxPrice")   BigDecimal maxPrice,
            @Param("search")     String search
    );

    long countByStatus(ListingStatus status);
}
