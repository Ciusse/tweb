package com.retrotrade.mapper;

import com.retrotrade.dto.CategoryDTO;
import com.retrotrade.dto.PlatformDTO;
import com.retrotrade.model.Category;
import com.retrotrade.model.Platform;
import org.springframework.stereotype.Component;

@Component
public class PlatformMapper {

    public PlatformDTO toPlatformDTO(Platform platform) {
        if (platform == null) return null;
        return new PlatformDTO(
                platform.getId(),
                platform.getName(),
                platform.getCode(),
                platform.getManufacturer(),
                platform.getReleaseYear(),
                platform.getGeneration()
        );
    }

    public CategoryDTO toCategoryDTO(Category category) {
        if (category == null) return null;
        return new CategoryDTO(
                category.getId(),
                category.getName(),
                category.getDescription()
        );
    }
}
