package com.retrotrade.mapper;

import com.retrotrade.dto.OrderDetailDTO;
import com.retrotrade.dto.OrderSummaryDTO;
import com.retrotrade.dto.ReviewDTO;
import com.retrotrade.dto.UserDTO;
import com.retrotrade.model.Order;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class OrderMapper {

    private final ListingMapper listingMapper;

    public OrderMapper(ListingMapper listingMapper) {
        this.listingMapper = listingMapper;
    }

    /**
     * Converte un'entità Order in OrderSummaryDTO shallow.
     */
    public OrderSummaryDTO toSummaryDTO(Order order) {
        if (order == null) return null;

        OrderSummaryDTO dto = new OrderSummaryDTO();
        dto.setId(order.getId());
        dto.setOrderDate(order.getOrderDate());
        dto.setTotalPrice(order.getTotalPrice());
        dto.setShippingAddress(order.getShippingAddress());
        dto.setStatus(order.getStatus());

        if (order.getListing() != null) {
            dto.setListingId(order.getListing().getId());
            dto.setListingTitle(order.getListing().getTitle());
            dto.setListingImageUrl(order.getListing().getImageUrl());
            if (order.getListing().getPlatform() != null) {
                dto.setPlatformCode(order.getListing().getPlatform().getCode());
            }
            if (order.getListing().getSeller() != null) {
                dto.setSellerId(order.getListing().getSeller().getId());
                dto.setSellerUsername(order.getListing().getSeller().getUsername());
            }
        }

        if (order.getBuyer() != null) {
            dto.setBuyerId(order.getBuyer().getId());
            dto.setBuyerUsername(order.getBuyer().getUsername());
        }

        if (order.getReview() != null) {
            dto.setHasReview(true);
            dto.setReviewRating(order.getReview().getRating());
            dto.setReviewComment(order.getReview().getComment());
        } else {
            dto.setHasReview(false);
        }

        return dto;
    }

    public List<OrderSummaryDTO> toSummaryDTOList(List<Order> orders) {
        if (orders == null) return List.of();
        return orders.stream().map(this::toSummaryDTO).collect(Collectors.toList());
    }

    public OrderDetailDTO toDetailDTO(Order order) {
        if (order == null) return null;

        OrderDetailDTO dto = new OrderDetailDTO();
        dto.setId(order.getId());
        dto.setOrderDate(order.getOrderDate());
        dto.setTotalPrice(order.getTotalPrice());
        dto.setShippingAddress(order.getShippingAddress());
        dto.setStatus(order.getStatus());

        if (order.getBuyer() != null) {
            dto.setBuyer(new UserDTO(
                    order.getBuyer().getId(),
                    order.getBuyer().getUsername(),
                    order.getBuyer().getEmail(),
                    order.getBuyer().getRole()
            ));
        }

        dto.setListing(listingMapper.toSummaryDTO(order.getListing()));

        if (order.getReview() != null) {
            dto.setReview(new ReviewDTO(
                    order.getReview().getId(),
                    order.getReview().getRating(),
                    order.getReview().getComment(),
                    order.getReview().getCreatedAt(),
                    order.getReview().getAuthor() != null ? order.getReview().getAuthor().getUsername() : null,
                    order.getReview().getTargetUser() != null ? order.getReview().getTargetUser().getUsername() : null,
                    order.getId()
            ));
        }

        return dto;
    }
}
