package com.memoryos.dto;

import com.fasterxml.jackson.annotation.JsonAlias;
import com.memoryos.entity.Visibility;
import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.time.LocalDate;
import java.util.Set;
import java.util.UUID;

public record MemoryRequest(
        @NotBlank @Size(max = 255) String title,
        @Size(max = 5000) String description,
        @JsonAlias("content") @Size(max = 30000) String story,
        LocalDate memoryDate,
        @Size(max = 255) String locationName,
        @DecimalMin("-90.0") @DecimalMax("90.0") Double latitude,
        @DecimalMin("-180.0") @DecimalMax("180.0") Double longitude,
        Visibility visibility,
        Set<UUID> personIds
) {
}
