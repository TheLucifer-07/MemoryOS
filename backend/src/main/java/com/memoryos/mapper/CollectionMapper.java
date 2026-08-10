package com.memoryos.mapper;

import com.memoryos.dto.CollectionResponse;
import com.memoryos.entity.MemoryCollection;

import java.util.Comparator;

public final class CollectionMapper {
    private CollectionMapper() {
    }

    public static CollectionResponse toResponse(MemoryCollection collection) {
        var memories = collection.getMemories().stream()
                .sorted(Comparator.comparing(memory -> memory.getMemoryDate(), Comparator.nullsLast(Comparator.reverseOrder())))
                .map(MemoryMapper::toResponse)
                .toList();

        return new CollectionResponse(
                collection.getId(),
                collection.getUserId(),
                collection.getName(),
                collection.getDescription(),
                collection.getCoverImageUrl(),
                memories,
                collection.getCreatedAt(),
                collection.getUpdatedAt()
        );
    }
}
