package com.retrotrade.controller;

import com.retrotrade.dto.CategoryDTO;
import com.retrotrade.dto.PlatformDTO;
import com.retrotrade.service.PlatformService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class PlatformController {

    private final PlatformService platformService;

    public PlatformController(PlatformService platformService) {
        this.platformService = platformService;
    }

    /**
     * Route 12: Lista piattaforme con filtro opzionale per generazione videoludica via query string.
     * Esempio: GET /api/platforms?generation=4
     */
    @GetMapping("/platforms")
    public ResponseEntity<List<PlatformDTO>> getPlatforms(
            @RequestParam(required = false) Integer generation
    ) {
        List<PlatformDTO> platforms = platformService.getAllPlatforms(generation);
        return ResponseEntity.ok(platforms);
    }

    /**
     * Route 13: Dettaglio singola piattaforma hardware tramite variabile di path.
     * Esempio: GET /api/platforms/1
     */
    @GetMapping("/platforms/{id}")
    public ResponseEntity<PlatformDTO> getPlatformById(@PathVariable Long id) {
        PlatformDTO platform = platformService.getPlatformById(id);
        return ResponseEntity.ok(platform);
    }

    /**
     * Route 14: Catalogo delle categorie merceologiche disponibili.
     * Esempio: GET /api/categories
     */
    @GetMapping("/categories")
    public ResponseEntity<List<CategoryDTO>> getCategories() {
        List<CategoryDTO> categories = platformService.getAllCategories();
        return ResponseEntity.ok(categories);
    }

    /**
     * Route per censire una nuova piattaforma hardware / console.
     * Esempio: POST /api/platforms
     */
    @PostMapping("/platforms")
    public ResponseEntity<PlatformDTO> createPlatform(@RequestBody PlatformDTO dto) {
        PlatformDTO created = platformService.createPlatform(dto);
        return ResponseEntity.status(org.springframework.http.HttpStatus.CREATED).body(created);
    }
}
