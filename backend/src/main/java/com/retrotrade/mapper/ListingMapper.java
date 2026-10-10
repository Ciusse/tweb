package com.retrotrade.mapper;

import com.retrotrade.dto.ListingDetailDTO;
import com.retrotrade.dto.ListingSummaryDTO;
import com.retrotrade.dto.UserDTO;
import com.retrotrade.model.Listing;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class ListingMapper {

    private final PlatformMapper platformMapper;

    public ListingMapper(PlatformMapper platformMapper) {
        this.platformMapper = platformMapper;
    }

    /**
     * Converte un'entità Listing in una vista "shallow" (ListingSummaryDTO)
     * per limitare la profondità della risposta JSON e prevenire cicli relazionali.
     */
    public ListingSummaryDTO toSummaryDTO(Listing listing) {
        if (listing == null) return null;

        ListingSummaryDTO dto = new ListingSummaryDTO();
        dto.setId(listing.getId());
        dto.setTitle(listing.getTitle());
        dto.setPrice(listing.getPrice());
        dto.setItemCondition(listing.getItemCondition());
        dto.setPackagingStatus(listing.getPackagingStatus());
        dto.setStatus(listing.getStatus());
        dto.setImageUrl(listing.getImageUrl());
        dto.setCreatedAt(listing.getCreatedAt());

        if (listing.getPlatform() != null) {
            dto.setPlatformId(listing.getPlatform().getId());
            dto.setPlatformName(listing.getPlatform().getName());
            dto.setPlatformCode(listing.getPlatform().getCode());
        }

        if (listing.getCategory() != null) {
            dto.setCategoryId(listing.getCategory().getId());
            dto.setCategoryName(listing.getCategory().getName());
        }

        if (listing.getSeller() != null) {
            dto.setSellerId(listing.getSeller().getId());
            dto.setSellerUsername(listing.getSeller().getUsername());
        }

        return dto;
    }

    public List<ListingSummaryDTO> toSummaryDTOList(List<Listing> listings) {
        if (listings == null) return List.of();
        return listings.stream().map(this::toSummaryDTO).collect(Collectors.toList());
    }

    /**
     * Converte un'entità Listing in una vista dettagliata per scheda singolo annuncio.
     */
    public ListingDetailDTO toDetailDTO(Listing listing) {
        if (listing == null) return null;

        ListingDetailDTO dto = new ListingDetailDTO();
        dto.setId(listing.getId());
        dto.setTitle(listing.getTitle());
        dto.setDescription(listing.getDescription());
        dto.setPrice(listing.getPrice());
        dto.setItemCondition(listing.getItemCondition());
        dto.setPackagingStatus(listing.getPackagingStatus());
        dto.setStatus(listing.getStatus());
        dto.setImageUrl(listing.getImageUrl());
        dto.setCreatedAt(listing.getCreatedAt());

        dto.setPlatform(platformMapper.toPlatformDTO(listing.getPlatform()));
        dto.setCategory(platformMapper.toCategoryDTO(listing.getCategory()));

        if (listing.getSeller() != null) {
            dto.setSeller(new UserDTO(
                    listing.getSeller().getId(),
                    listing.getSeller().getUsername(),
                    listing.getSeller().getEmail(),
                    listing.getSeller().getRole()
            ));
        }

        if (listing.getOrder() != null) {
            dto.setOrderId(listing.getOrder().getId());
        }

        return dto;
    }
}
