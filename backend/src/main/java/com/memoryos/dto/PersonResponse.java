package com.memoryos.dto;

import java.time.Instant;
import java.util.Set;
import java.util.UUID;

public record PersonResponse(
        UUID id,
        UUID userId,
        String name,
        String avatarUrl,
        String relationship,
        String notes,
        Set<UUID> memoryIds,
        Instant createdAt,
        Instant updatedAt
) {
}
