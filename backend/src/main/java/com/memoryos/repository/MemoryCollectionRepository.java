package com.memoryos.repository;

import com.memoryos.entity.MemoryCollection;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface MemoryCollectionRepository extends JpaRepository<MemoryCollection, UUID> {
    List<MemoryCollection> findByUserIdOrderByCreatedAtDesc(UUID userId);

    @EntityGraph(attributePaths = "memories")
    Optional<MemoryCollection> findWithMemoriesByIdAndUserId(UUID id, UUID userId);
}
