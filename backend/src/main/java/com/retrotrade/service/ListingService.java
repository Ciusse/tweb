package com.retrotrade.service;

import com.retrotrade.dto.ListingCreateDTO;
import com.retrotrade.dto.ListingDetailDTO;
import com.retrotrade.dto.ListingSummaryDTO;
import com.retrotrade.dto.ListingUpdateDTO;
import com.retrotrade.exception.BadRequestException;
import com.retrotrade.exception.ResourceNotFoundException;
import com.retrotrade.exception.UnauthorizedException;
import com.retrotrade.mapper.ListingMapper;
import com.retrotrade.model.*;
import com.retrotrade.repository.CategoryRepository;
import com.retrotrade.repository.ListingRepository;
import com.retrotrade.repository.PlatformRepository;
import com.retrotrade.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;

@Service
@Transactional(readOnly = true)
public class ListingService {

    private final ListingRepository listingRepository;
    private final UserRepository userRepository;
    private final PlatformRepository platformRepository;
    private final CategoryRepository categoryRepository;
    private final ListingMapper listingMapper;

    public ListingService(ListingRepository listingRepository,
                          UserRepository userRepository,
                          PlatformRepository platformRepository,
                          CategoryRepository categoryRepository,
                          ListingMapper listingMapper) {
        this.listingRepository = listingRepository;
        this.userRepository = userRepository;
        this.platformRepository = platformRepository;
        this.categoryRepository = categoryRepository;
        this.listingMapper = listingMapper;
    }

    public List<ListingSummaryDTO> searchListings(ListingStatus status, Long platformId, Long categoryId,
                                                  ItemCondition condition, BigDecimal maxPrice, String search) {
        String statusStr    = status    != null ? status.name()    : null;
        String conditionStr = condition != null ? condition.name() : null;
        List<Listing> listings = listingRepository.searchListings(
                statusStr, platformId, categoryId, conditionStr, maxPrice, search);
        return listingMapper.toSummaryDTOList(listings);
    }

    public ListingDetailDTO getListingById(Long id) {
        Listing listing = listingRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Annuncio con ID " + id + " non trovato."));
        return listingMapper.toDetailDTO(listing);
    }

    public List<ListingSummaryDTO> getMyListings(Long currentUserId) {
        if (currentUserId == null) {
            throw new UnauthorizedException("Utente non autenticato.");
        }
        List<Listing> listings = listingRepository.findBySellerIdOrderByCreatedAtDesc(currentUserId);
        return listingMapper.toSummaryDTOList(listings);
    }

    @Transactional
    public ListingDetailDTO createListing(ListingCreateDTO dto, Long currentUserId) {
        if (currentUserId == null) {
            throw new UnauthorizedException("Devi aver effettuato l'accesso per creare un annuncio.");
        }

        User seller = userRepository.findById(currentUserId)
                .orElseThrow(() -> new ResourceNotFoundException("Utente venditore non trovato."));

        Platform platform = platformRepository.findById(dto.getPlatformId())
                .orElseThrow(() -> new ResourceNotFoundException("Piattaforma con ID " + dto.getPlatformId() + " non trovata."));

        Category category = categoryRepository.findById(dto.getCategoryId())
                .orElseThrow(() -> new ResourceNotFoundException("Categoria con ID " + dto.getCategoryId() + " non trovata."));

        String image = (dto.getImageUrl() != null && !dto.getImageUrl().trim().isEmpty())
                ? dto.getImageUrl().trim()
                : "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=600&q=80";

        Listing listing = new Listing(
                dto.getTitle().trim(),
                dto.getDescription().trim(),
                dto.getPrice(),
                dto.getItemCondition(),
                dto.getPackagingStatus(),
                image,
                seller,
                platform,
                category
        );

        Listing saved = listingRepository.save(listing);
        return listingMapper.toDetailDTO(saved);
    }

    @Transactional
    public ListingDetailDTO updateListing(Long id, ListingUpdateDTO dto, Long currentUserId, boolean isAdmin) {
        Listing listing = listingRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Annuncio con ID " + id + " non trovato."));

        if (!isAdmin && (currentUserId == null || !listing.getSeller().getId().equals(currentUserId))) {
            throw new UnauthorizedException("Non sei autorizzato a modificare questo annuncio.");
        }

        if (listing.getStatus() == ListingStatus.SOLD) {
            throw new BadRequestException("Impossibile modificare un annuncio già venduto.");
        }

        if (dto.getTitle() != null && !dto.getTitle().trim().isEmpty()) {
            listing.setTitle(dto.getTitle().trim());
        }
        if (dto.getDescription() != null && !dto.getDescription().trim().isEmpty()) {
            listing.setDescription(dto.getDescription().trim());
        }
        if (dto.getPrice() != null) {
            listing.setPrice(dto.getPrice());
        }
        if (dto.getItemCondition() != null) {
            listing.setItemCondition(dto.getItemCondition());
        }
        if (dto.getPackagingStatus() != null) {
            listing.setPackagingStatus(dto.getPackagingStatus());
        }
        if (dto.getStatus() != null) {
            listing.setStatus(dto.getStatus());
        }
        if (dto.getImageUrl() != null && !dto.getImageUrl().trim().isEmpty()) {
            listing.setImageUrl(dto.getImageUrl().trim());
        }

        Listing updated = listingRepository.save(listing);
        return listingMapper.toDetailDTO(updated);
    }

    @Transactional
    public void deleteListing(Long id, Long currentUserId, boolean isAdmin) {
        Listing listing = listingRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Annuncio con ID " + id + " non trovato."));

        if (!isAdmin && (currentUserId == null || !listing.getSeller().getId().equals(currentUserId))) {
            throw new UnauthorizedException("Non hai i permessi per cancellare questo annuncio.");
        }

        // Soft-delete: se collegato a ordini passati, lo marchiamo come REMOVED, altrimenti cancellazione fisica
        if (listing.getOrder() != null) {
            listing.setStatus(ListingStatus.REMOVED);
            listingRepository.save(listing);
        } else {
            listingRepository.delete(listing);
        }
    }
}
