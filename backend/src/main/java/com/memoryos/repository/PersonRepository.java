package com.memoryos.repository;

import com.memoryos.entity.Person;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Collection;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface PersonRepository extends JpaRepository<Person, UUID> {
    List<Person> findByUserIdOrderByNameAsc(UUID userId);

    @EntityGraph(attributePaths = "memories")
    Optional<Person> findWithMemoriesByIdAndUserId(UUID id, UUID userId);

    List<Person> findByIdInAndUserId(Collection<UUID> ids, UUID userId);
}
