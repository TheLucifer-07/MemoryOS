package com.memoryos.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record GeocodeRequest(
        @NotBlank @Size(max = 255) String locationName
) {
}
