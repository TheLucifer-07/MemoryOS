package com.memoryos.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.util.Set;
import java.util.UUID;

public record CollectionRequest(
        @NotBlank @Size(max = 100) String name,
        @Size(max = 5000) String description,
        @Size(max = 2048) String coverImageUrl,
        Set<UUID> memoryIds
) {
}
