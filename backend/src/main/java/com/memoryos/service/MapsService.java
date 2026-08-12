package com.memoryos.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.memoryos.config.MapsProperties;
import com.memoryos.dto.LocationResponse;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;
import org.springframework.web.util.UriComponentsBuilder;

@Service
public class MapsService {
    private static final String GEOCODING_ENDPOINT = "https://maps.googleapis.com/maps/api/geocode/json";

    private final MapsProperties properties;
    private final RestClient restClient;
    private final ObjectMapper objectMapper;

    public MapsService(MapsProperties properties, ObjectMapper objectMapper) {
        this.properties = properties;
        this.objectMapper = objectMapper;
        this.restClient = RestClient.create();
    }

    public boolean isConfigured() {
        return properties.isConfigured();
    }

    public String browserApiKey() {
        return isConfigured() ? properties.getApiKey().trim() : null;
    }

    public LocationResponse geocode(String locationName) {
        String cleanedLocation = trimToNull(locationName);
        if (cleanedLocation == null) {
            return unresolved(null, "Location is required.");
        }
        if (!isConfigured()) {
            return new LocationResponse(cleanedLocation, null, null, false, "Google Maps is not configured.");
        }

        String uri = UriComponentsBuilder.fromUriString(GEOCODING_ENDPOINT)
                .queryParam("address", cleanedLocation)
                .queryParam("key", properties.getApiKey().trim())
                .build()
                .encode()
                .toUriString();

        return requestLocation(uri, cleanedLocation);
    }

    public LocationResponse reverseGeocode(Double latitude, Double longitude) {
        if (latitude == null || longitude == null) {
            return unresolved(null, "Latitude and longitude are required.");
        }
        if (!isConfigured()) {
            return new LocationResponse(null, latitude, longitude, false, "Google Maps is not configured.");
        }

        String uri = UriComponentsBuilder.fromUriString(GEOCODING_ENDPOINT)
                .queryParam("latlng", latitude + "," + longitude)
                .queryParam("key", properties.getApiKey().trim())
                .build()
                .encode()
                .toUriString();

        return requestLocation(uri, null, latitude, longitude);
    }

    private LocationResponse requestLocation(String uri, String fallbackName) {
        return requestLocation(uri, fallbackName, null, null);
    }

    private LocationResponse requestLocation(String uri, String fallbackName, Double fallbackLatitude, Double fallbackLongitude) {
        try {
            String body = restClient.get()
                    .uri(uri)
                    .retrieve()
                    .body(String.class);
            JsonNode root = objectMapper.readTree(body);
            String status = root.path("status").asText();
            JsonNode first = root.path("results").path(0);

            if (!"OK".equals(status) || first.isMissingNode()) {
                return new LocationResponse(fallbackName, fallbackLatitude, fallbackLongitude, false, "Location could not be resolved.");
            }

            String formattedAddress = first.path("formatted_address").asText(fallbackName);
            JsonNode location = first.path("geometry").path("location");
            if (!location.hasNonNull("lat") || !location.hasNonNull("lng")) {
                return new LocationResponse(formattedAddress, fallbackLatitude, fallbackLongitude, false, "Location could not be resolved.");
            }
            double latitude = location.path("lat").asDouble();
            double longitude = location.path("lng").asDouble();
            return new LocationResponse(formattedAddress, latitude, longitude, true, null);
        } catch (Exception ex) {
            return new LocationResponse(fallbackName, fallbackLatitude, fallbackLongitude, false, "Location service is unavailable.");
        }
    }

    private LocationResponse unresolved(String locationName, String message) {
        return new LocationResponse(locationName, null, null, false, message);
    }

    private String trimToNull(String value) {
        if (value == null || value.isBlank()) {
            return null;
        }
        return value.trim();
    }
}
