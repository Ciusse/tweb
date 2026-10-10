package com.retrotrade.controller;

import com.retrotrade.dto.*;
import com.retrotrade.model.OrderStatus;
import com.retrotrade.service.OrderService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "*")
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    /**
     * Route 7: Finalizzazione acquisto con riserva atomica dell'annuncio via Request Body JSON.
     * Esempio: POST /api/orders
     */
    @PostMapping
    public ResponseEntity<OrderDetailDTO> createOrder(
            @Valid @RequestBody OrderCreateDTO dto,
            @RequestHeader(value = "X-User-Id", defaultValue = "2") Long currentUserId
    ) {
        OrderDetailDTO order = orderService.createOrder(dto, currentUserId);
        return ResponseEntity.status(HttpStatus.CREATED).body(order);
    }

    /**
     * Route 8: Dettaglio singolo ordine tramite variabile di percorso.
     * Esempio: GET /api/orders/12
     */
    @GetMapping("/{id}")
    public ResponseEntity<OrderDetailDTO> getOrderById(
            @PathVariable Long id,
            @RequestHeader(value = "X-User-Id", defaultValue = "2") Long currentUserId,
            @RequestHeader(value = "X-User-Role", defaultValue = "ROLE_USER") String role
    ) {
        boolean isAdmin = "ROLE_ADMIN".equalsIgnoreCase(role);
        OrderDetailDTO order = orderService.getOrderById(id, currentUserId, isAdmin);
        return ResponseEntity.ok(order);
    }

    /**
     * Route 9: Storico ordini dell'acquirente con filtro query string opzionale per stato ordine.
     * Esempio: GET /api/orders/buyer?status=PENDING
     */
    @GetMapping("/buyer")
    public ResponseEntity<List<OrderSummaryDTO>> getBuyerOrders(
            @RequestParam(required = false) OrderStatus status,
            @RequestHeader(value = "X-User-Id", defaultValue = "2") Long currentUserId
    ) {
        List<OrderSummaryDTO> orders = orderService.getBuyerOrders(currentUserId, status);
        return ResponseEntity.ok(orders);
    }

    /**
     * Route 10: Annullamento ordine con path variable e motivazione in request body.
     * Esempio: PATCH /api/orders/12/cancel
     */
    @PatchMapping("/{id}/cancel")
    public ResponseEntity<OrderDetailDTO> cancelOrder(
            @PathVariable Long id,
            @Valid @RequestBody OrderCancelDTO dto,
            @RequestHeader(value = "X-User-Id", defaultValue = "2") Long currentUserId,
            @RequestHeader(value = "X-User-Role", defaultValue = "ROLE_USER") String role
    ) {
        boolean isAdmin = "ROLE_ADMIN".equalsIgnoreCase(role);
        OrderDetailDTO cancelled = orderService.cancelOrder(id, dto, currentUserId, isAdmin);
        return ResponseEntity.ok(cancelled);
    }

    /**
     * Route 11: Rilascio di recensione sull'ordine con path variable e request body.
     * Esempio: POST /api/orders/12/reviews
     */
    @PostMapping("/{id}/reviews")
    public ResponseEntity<ReviewDTO> addReview(
            @PathVariable Long id,
            @Valid @RequestBody ReviewCreateDTO dto,
            @RequestHeader(value = "X-User-Id", defaultValue = "2") Long currentUserId
    ) {
        ReviewDTO review = orderService.addReviewToOrder(id, dto, currentUserId);
        return ResponseEntity.status(HttpStatus.CREATED).body(review);
    }

    /**
     * Route aggiuntiva: Elenco di tutte le recensioni ricevute da un venditore.
     * Esempio: GET /api/orders/seller/1/reviews
     */
    @GetMapping("/seller/{sellerId}/reviews")
    public ResponseEntity<List<ReviewDTO>> getSellerReviews(@PathVariable Long sellerId) {
        List<ReviewDTO> reviews = orderService.getSellerReviews(sellerId);
        return ResponseEntity.ok(reviews);
    }
}
