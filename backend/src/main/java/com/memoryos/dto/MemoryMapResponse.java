package com.memoryos.dto;

import java.time.LocalDate;
import java.util.UUID;

public record MemoryMapResponse(
        UUID id,
        String title,
        LocalDate memoryDate,
        Double latitude,
        Double longitude,
        String thumbnailUrl
) {
}
