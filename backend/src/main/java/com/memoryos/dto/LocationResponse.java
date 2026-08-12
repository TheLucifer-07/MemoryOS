package com.memoryos.dto;

public record LocationResponse(
        String locationName,
        Double latitude,
        Double longitude,
        boolean resolved,
        String message
) {
}
