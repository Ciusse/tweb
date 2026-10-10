package com.retrotrade.service;

import com.retrotrade.dto.CategoryDTO;
import com.retrotrade.dto.PlatformDTO;
import com.retrotrade.exception.ResourceNotFoundException;
import com.retrotrade.mapper.PlatformMapper;
import com.retrotrade.model.Category;
import com.retrotrade.model.Platform;
import com.retrotrade.repository.CategoryRepository;
import com.retrotrade.repository.PlatformRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
public class PlatformService {

    private final PlatformRepository platformRepository;
    private final CategoryRepository categoryRepository;
    private final PlatformMapper platformMapper;

    public PlatformService(PlatformRepository platformRepository,
                           CategoryRepository categoryRepository,
                           PlatformMapper platformMapper) {
        this.platformRepository = platformRepository;
        this.categoryRepository = categoryRepository;
        this.platformMapper = platformMapper;
    }

    public List<PlatformDTO> getAllPlatforms(Integer generation) {
        List<Platform> platforms = (generation != null)
                ? platformRepository.findByGeneration(generation)
                : platformRepository.findAllByOrderByReleaseYearAsc();

        return platforms.stream()
                .map(platformMapper::toPlatformDTO)
                .collect(Collectors.toList());
    }

    public PlatformDTO getPlatformById(Long id) {
        Platform platform = platformRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Piattaforma con ID " + id + " non trovata."));
        return platformMapper.toPlatformDTO(platform);
    }

    public List<CategoryDTO> getAllCategories() {
        List<Category> categories = categoryRepository.findAllByOrderByNameAsc();
        return categories.stream()
                .map(platformMapper::toCategoryDTO)
                .collect(Collectors.toList());
    }

    @Transactional
    public PlatformDTO createPlatform(PlatformDTO dto) {
        String cleanCode = (dto.getCode() != null && !dto.getCode().trim().isEmpty())
                ? dto.getCode().trim().toUpperCase()
                : dto.getName().replaceAll("[^A-Za-z0-9]", "").substring(0, Math.min(5, dto.getName().length())).toUpperCase();

        Platform platform = new Platform(
                dto.getName().trim(),
                cleanCode,
                dto.getManufacturer() != null && !dto.getManufacturer().trim().isEmpty() ? dto.getManufacturer().trim() : "Custom",
                dto.getReleaseYear() != null ? dto.getReleaseYear() : 1995,
                dto.getGeneration() != null ? dto.getGeneration() : 5
        );

        Platform saved = platformRepository.save(platform);
        return platformMapper.toPlatformDTO(saved);
    }
}
