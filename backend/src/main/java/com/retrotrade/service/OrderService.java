package com.retrotrade.service;

import com.retrotrade.dto.*;
import com.retrotrade.exception.BadRequestException;
import com.retrotrade.exception.ConflictException;
import com.retrotrade.exception.ResourceNotFoundException;
import com.retrotrade.exception.UnauthorizedException;
import com.retrotrade.mapper.OrderMapper;
import com.retrotrade.model.*;
import com.retrotrade.repository.ListingRepository;
import com.retrotrade.repository.OrderRepository;
import com.retrotrade.repository.ReviewRepository;
import com.retrotrade.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(readOnly = true)
public class OrderService {

    private final OrderRepository orderRepository;
    private final ListingRepository listingRepository;
    private final UserRepository userRepository;
    private final ReviewRepository reviewRepository;
    private final OrderMapper orderMapper;

    public OrderService(OrderRepository orderRepository,
                        ListingRepository listingRepository,
                        UserRepository userRepository,
                        ReviewRepository reviewRepository,
                        OrderMapper orderMapper) {
        this.orderRepository = orderRepository;
        this.listingRepository = listingRepository;
        this.userRepository = userRepository;
        this.reviewRepository = reviewRepository;
        this.orderMapper = orderMapper;
    }

    @Transactional
    public OrderDetailDTO createOrder(OrderCreateDTO dto, Long currentUserId) {
        if (currentUserId == null) {
            throw new UnauthorizedException("Devi effettuare l'accesso per effettuare un ordine.");
        }

        User buyer = userRepository.findById(currentUserId)
                .orElseThrow(() -> new ResourceNotFoundException("Acquirente non trovato."));

        Listing listing = listingRepository.findById(dto.getListingId())
                .orElseThrow(() -> new ResourceNotFoundException("Annuncio con ID " + dto.getListingId() + " non trovato."));

        // Controllo concorrenza / stato
        if (listing.getStatus() != ListingStatus.AVAILABLE) {
            throw new ConflictException("L'annuncio selezionato non è disponibile (è già stato venduto o riservato).");
        }

        // Impedisci l'autocompravebdita
        if (listing.getSeller().getId().equals(currentUserId)) {
            throw new BadRequestException("Non puoi acquistare un tuo annuncio!");
        }

        // Muta atomicamente lo stato dell'annuncio
        listing.setStatus(ListingStatus.SOLD);
        listingRepository.save(listing);

        // Crea l'ordine
        Order order = new Order(
                listing.getPrice(),
                dto.getShippingAddress().trim(),
                buyer,
                listing
        );

        Order saved = orderRepository.save(order);
        return orderMapper.toDetailDTO(saved);
    }

    public OrderDetailDTO getOrderById(Long id, Long currentUserId, boolean isAdmin) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Ordine con ID " + id + " non trovato."));

        boolean isBuyer = order.getBuyer().getId().equals(currentUserId);
        boolean isSeller = order.getListing().getSeller().getId().equals(currentUserId);

        if (!isAdmin && !isBuyer && !isSeller) {
            throw new UnauthorizedException("Non sei autorizzato a visualizzare questo ordine.");
        }

        return orderMapper.toDetailDTO(order);
    }

    public List<OrderSummaryDTO> getBuyerOrders(Long buyerId, OrderStatus status) {
        if (buyerId == null) {
            throw new UnauthorizedException("Utente non autenticato.");
        }
        List<Order> orders = orderRepository.findByBuyerIdAndStatus(buyerId, status);
        return orderMapper.toSummaryDTOList(orders);
    }

    @Transactional
    public OrderDetailDTO cancelOrder(Long id, OrderCancelDTO dto, Long currentUserId, boolean isAdmin) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Ordine con ID " + id + " non trovato."));

        boolean isBuyer = order.getBuyer().getId().equals(currentUserId);
        boolean isSeller = order.getListing().getSeller().getId().equals(currentUserId);

        if (!isAdmin && !isBuyer && !isSeller) {
            throw new UnauthorizedException("Non hai i permessi per annullare questo ordine.");
        }

        if (order.getStatus() == OrderStatus.CANCELLED) {
            throw new BadRequestException("L'ordine è già stato annullato in precedenza.");
        }

        if (order.getStatus() == OrderStatus.COMPLETED) {
            throw new BadRequestException("Impossibile annullare un ordine già consegnato e completato.");
        }

        order.setStatus(OrderStatus.CANCELLED);

        // Ripristina la disponibilità dell'annuncio
        Listing listing = order.getListing();
        listing.setStatus(ListingStatus.AVAILABLE);
        listingRepository.save(listing);

        Order updated = orderRepository.save(order);
        return orderMapper.toDetailDTO(updated);
    }

    @Transactional
    public ReviewDTO addReviewToOrder(Long orderId, ReviewCreateDTO dto, Long currentUserId) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new ResourceNotFoundException("Ordine con ID " + orderId + " non trovato."));

        if (!order.getBuyer().getId().equals(currentUserId)) {
            throw new UnauthorizedException("Solo l'acquirente effettivo dell'ordine può rilasciare una recensione.");
        }

        if (order.getReview() != null) {
            throw new ConflictException("È già presente una recensione per questo ordine.");
        }

        User author = order.getBuyer();
        User targetUser = order.getListing().getSeller();

        Review review = new Review(
                dto.getRating(),
                dto.getComment(),
                author,
                targetUser,
                order
        );

        Review saved = reviewRepository.save(review);
        order.setReview(saved);
        orderRepository.save(order);

        return new ReviewDTO(
                saved.getId(),
                saved.getRating(),
                saved.getComment(),
                saved.getCreatedAt(),
                author.getUsername(),
                targetUser.getUsername(),
                order.getId()
        );
    }

    public List<ReviewDTO> getSellerReviews(Long sellerId) {
        List<Review> reviews = reviewRepository.findByTargetUserIdOrderByCreatedAtDesc(sellerId);
        return reviews.stream()
                .map(r -> new ReviewDTO(
                        r.getId(),
                        r.getRating(),
                        r.getComment(),
                        r.getCreatedAt(),
                        r.getAuthor() != null ? r.getAuthor().getUsername() : "Utente",
                        r.getTargetUser() != null ? r.getTargetUser().getUsername() : "Venditore",
                        r.getOrder() != null ? r.getOrder().getId() : null
                ))
                .collect(java.util.stream.Collectors.toList());
    }
}
