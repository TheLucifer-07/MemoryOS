package com.memoryos.dto;

import java.time.Instant;
import java.util.UUID;

public record ProfileResponse(
        UUID id,
        UUID userId,
        String displayName,
        String avatarUrl,
        String bio,
        String timezone,
        Instant createdAt,
        Instant updatedAt
) {
}
