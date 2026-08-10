package com.memoryos.repository;

import com.memoryos.entity.Memory;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.Collection;

public interface MemoryRepository extends JpaRepository<Memory, UUID> {
    @EntityGraph(attributePaths = "people")
    List<Memory> findByUserIdOrderByMemoryDateDescCreatedAtDesc(UUID userId);

    @EntityGraph(attributePaths = "people")
    Optional<Memory> findWithPeopleById(UUID id);

    Optional<Memory> findByIdAndUserId(UUID id, UUID userId);

    @EntityGraph(attributePaths = "people")
    Optional<Memory> findWithPeopleByIdAndUserId(UUID id, UUID userId);

    List<Memory> findByIdInAndUserId(Collection<UUID> ids, UUID userId);

    List<Memory> findByUserIdAndLatitudeIsNotNullAndLongitudeIsNotNullOrderByMemoryDateDescCreatedAtDesc(UUID userId);

    @Query("""
            select m from Memory m
            where m.userId = :userId
              and (
                lower(m.title) like lower(concat('%', :query, '%'))
                or lower(coalesce(m.description, '')) like lower(concat('%', :query, '%'))
                or lower(coalesce(m.story, '')) like lower(concat('%', :query, '%'))
                or lower(coalesce(m.locationName, '')) like lower(concat('%', :query, '%'))
              )
            order by m.memoryDate desc nulls last, m.createdAt desc
            """)
    @EntityGraph(attributePaths = "people")
    List<Memory> searchByUserId(@Param("userId") UUID userId, @Param("query") String query);
}
