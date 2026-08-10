package com.memoryos.dto;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

public record CollectionResponse(
        UUID id,
        UUID userId,
        String name,
        String description,
        String coverImageUrl,
        List<MemoryResponse> memories,
        Instant createdAt,
        Instant updatedAt
) {
}
