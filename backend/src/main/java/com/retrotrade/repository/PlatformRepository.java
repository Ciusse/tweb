package com.retrotrade.repository;

import com.retrotrade.model.Platform;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PlatformRepository extends JpaRepository<Platform, Long> {
    List<Platform> findByGeneration(Integer generation);
    List<Platform> findAllByOrderByReleaseYearAsc();
}
