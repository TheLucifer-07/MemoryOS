package com.memoryos.service;

import com.memoryos.dto.CollectionRequest;
import com.memoryos.dto.CollectionResponse;
import com.memoryos.entity.Memory;
import com.memoryos.entity.MemoryCollection;
import com.memoryos.exception.ForbiddenException;
import com.memoryos.exception.ResourceNotFoundException;
import com.memoryos.mapper.CollectionMapper;
import com.memoryos.repository.MemoryCollectionRepository;
import com.memoryos.repository.MemoryRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Set;
import java.util.UUID;

@Service
public class CollectionService {
    private final MemoryCollectionRepository collectionRepository;
    private final MemoryRepository memoryRepository;

    public CollectionService(MemoryCollectionRepository collectionRepository, MemoryRepository memoryRepository) {
        this.collectionRepository = collectionRepository;
        this.memoryRepository = memoryRepository;
    }

    @Transactional
    public CollectionResponse createCollection(UUID userId, CollectionRequest request) {
        MemoryCollection collection = new MemoryCollection();
        collection.setUserId(userId);
        applyRequest(collection, request, userId);
        return CollectionMapper.toResponse(collectionRepository.save(collection));
    }

    @Transactional(readOnly = true)
    public List<CollectionResponse> listCollections(UUID userId) {
        return collectionRepository.findByUserIdOrderByCreatedAtDesc(userId).stream()
                .map(CollectionMapper::toResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public CollectionResponse getCollection(UUID userId, UUID id) {
        return CollectionMapper.toResponse(loadOwnedCollection(userId, id));
    }

    @Transactional
    public CollectionResponse updateCollection(UUID userId, UUID id, CollectionRequest request) {
        MemoryCollection collection = loadOwnedCollection(userId, id);
        applyRequest(collection, request, userId);
        return CollectionMapper.toResponse(collectionRepository.save(collection));
    }

    @Transactional
    public void deleteCollection(UUID userId, UUID id) {
        MemoryCollection collection = loadOwnedCollection(userId, id);
        collectionRepository.delete(collection);
    }

    private MemoryCollection loadOwnedCollection(UUID userId, UUID id) {
        return collectionRepository.findWithMemoriesByIdAndUserId(id, userId)
                .orElseThrow(() -> new ResourceNotFoundException("Collection not found"));
    }

    private void applyRequest(MemoryCollection collection, CollectionRequest request, UUID userId) {
        collection.setName(request.name().trim());
        collection.setDescription(trimToNull(request.description()));
        collection.setCoverImageUrl(trimToNull(request.coverImageUrl()));
        collection.getMemories().clear();
        collection.getMemories().addAll(resolveMemories(userId, request.memoryIds()));
    }

    private Set<Memory> resolveMemories(UUID userId, Set<UUID> memoryIds) {
        if (memoryIds == null || memoryIds.isEmpty()) {
            return Set.of();
        }

        List<Memory> memories = memoryRepository.findByIdInAndUserId(memoryIds, userId);
        if (memories.size() != memoryIds.size()) {
            throw new ForbiddenException("One or more memories do not belong to the current user");
        }
        return Set.copyOf(memories);
    }

    private String trimToNull(String value) {
        if (value == null || value.isBlank()) {
            return null;
        }
        return value.trim();
    }
}
