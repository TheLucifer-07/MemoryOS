package com.memoryos.dto;

public record MapsConfigResponse(
        boolean configured,
        String apiKey
) {
    @Override
    public String toString() {
        return "MapsConfigResponse[configured=" + configured + ", apiKey=" + (apiKey == null ? null : "[REDACTED]") + "]";
    }
}
