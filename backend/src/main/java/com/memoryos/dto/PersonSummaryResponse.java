package com.memoryos.dto;

import java.util.UUID;

public record PersonSummaryResponse(
        UUID id,
        String name,
        String avatarUrl,
        String relationship
) {
}
