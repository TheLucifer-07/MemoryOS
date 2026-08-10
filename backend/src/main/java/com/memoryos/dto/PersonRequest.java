package com.memoryos.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.util.Set;
import java.util.UUID;

public record PersonRequest(
        @NotBlank @Size(max = 100) String name,
        @Size(max = 2048) String avatarUrl,
        @Size(max = 50) String relationship,
        @Size(max = 5000) String notes,
        Set<UUID> memoryIds
) {
}
