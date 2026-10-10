package com.retrotrade.controller;

import com.retrotrade.dto.ListingCreateDTO;
import com.retrotrade.dto.ListingDetailDTO;
import com.retrotrade.dto.ListingSummaryDTO;
import com.retrotrade.dto.ListingUpdateDTO;
import com.retrotrade.model.ItemCondition;
import com.retrotrade.model.ListingStatus;
import com.retrotrade.service.ListingService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/listings")
@CrossOrigin(origins = "*")
public class ListingController {

    private final ListingService listingService;

    public ListingController(ListingService listingService) {
        this.listingService = listingService;
    }

    /**
     * Route 1: Ricerca e filtraggio annunci tramite query parameters.
     * Esempio: GET /api/listings?platformId=1&maxPrice=100&condition=MINT&search=mario
     */
    @GetMapping
    public ResponseEntity<List<ListingSummaryDTO>> getAllListings(
            @RequestParam(required = false) Long platformId,
            @RequestParam(required = false) Long categoryId,
            @RequestParam(required = false) ItemCondition condition,
            @RequestParam(required = false) BigDecimal maxPrice,
            @RequestParam(required = false) String search,
            @RequestParam(required = false, defaultValue = "AVAILABLE") ListingStatus status
    ) {
        List<ListingSummaryDTO> results = listingService.searchListings(status, platformId, categoryId, condition, maxPrice, search);
        return ResponseEntity.ok(results);
    }

    /**
     * Route 2: Dettaglio singolo annuncio tramite segmento variabile di path.
     * Esempio: GET /api/listings/5
     */
    @GetMapping("/{id}")
    public ResponseEntity<ListingDetailDTO> getListingById(@PathVariable Long id) {
        ListingDetailDTO detail = listingService.getListingById(id);
        return ResponseEntity.ok(detail);
    }

    /**
     * Route 3: Creazione nuovo annuncio via Request Body JSON con validazione Jakarta.
     * Esempio: POST /api/listings
     */
    @PostMapping
    public ResponseEntity<ListingDetailDTO> createListing(
            @Valid @RequestBody ListingCreateDTO dto,
            @RequestHeader(value = "X-User-Id", defaultValue = "1") Long currentUserId
    ) {
        ListingDetailDTO created = listingService.createListing(dto, currentUserId);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    /**
     * Route 4: Aggiornamento parziale/totale annuncio via path e request body.
     * Esempio: PUT /api/listings/5
     */
    @PutMapping("/{id}")
    public ResponseEntity<ListingDetailDTO> updateListing(
            @PathVariable Long id,
            @Valid @RequestBody ListingUpdateDTO dto,
            @RequestHeader(value = "X-User-Id", defaultValue = "1") Long currentUserId,
            @RequestHeader(value = "X-User-Role", defaultValue = "ROLE_USER") String role
    ) {
        boolean isAdmin = "ROLE_ADMIN".equalsIgnoreCase(role);
        ListingDetailDTO updated = listingService.updateListing(id, dto, currentUserId, isAdmin);
        return ResponseEntity.ok(updated);
    }

    /**
     * Route 5: Cancellazione o revoca annuncio tramite path variable.
     * Esempio: DELETE /api/listings/5
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteListing(
            @PathVariable Long id,
            @RequestHeader(value = "X-User-Id", defaultValue = "1") Long currentUserId,
            @RequestHeader(value = "X-User-Role", defaultValue = "ROLE_USER") String role
    ) {
        boolean isAdmin = "ROLE_ADMIN".equalsIgnoreCase(role);
        listingService.deleteListing(id, currentUserId, isAdmin);
        return ResponseEntity.noContent().build();
    }

    /**
     * Route 6: Recupero degli annunci pubblicati dall'utente autenticato.
     * Esempio: GET /api/listings/my-listings
     */
    @GetMapping("/my-listings")
    public ResponseEntity<List<ListingSummaryDTO>> getMyListings(
            @RequestHeader(value = "X-User-Id", defaultValue = "1") Long currentUserId
    ) {
        List<ListingSummaryDTO> myListings = listingService.getMyListings(currentUserId);
        return ResponseEntity.ok(myListings);
    }
}
