package com.memoryos.controller;

import com.memoryos.dto.GeocodeRequest;
import com.memoryos.dto.LocationResponse;
import com.memoryos.dto.MapsConfigResponse;
import com.memoryos.dto.ReverseGeocodeRequest;
import com.memoryos.service.MapsService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/locations")
public class LocationController {
    private final MapsService mapsService;

    public LocationController(MapsService mapsService) {
        this.mapsService = mapsService;
    }

    @GetMapping("/maps-config")
    public MapsConfigResponse mapsConfig() {
        return new MapsConfigResponse(mapsService.isConfigured(), mapsService.browserApiKey());
    }

    @PostMapping("/geocode")
    public LocationResponse geocode(@Valid @RequestBody GeocodeRequest request) {
        return mapsService.geocode(request.locationName());
    }

    @PostMapping("/reverse-geocode")
    public LocationResponse reverseGeocode(@Valid @RequestBody ReverseGeocodeRequest request) {
        return mapsService.reverseGeocode(request.latitude(), request.longitude());
    }
}
