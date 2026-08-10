package com.memoryos.dto;

import com.memoryos.entity.Visibility;

import java.time.Instant;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

public record MemoryResponse(
        UUID id,
        UUID userId,
        String title,
        String description,
        String story,
        LocalDate memoryDate,
        String locationName,
        Double latitude,
        Double longitude,
        Visibility visibility,
        List<PersonSummaryResponse> people,
        Instant createdAt,
        Instant updatedAt
) {
}
