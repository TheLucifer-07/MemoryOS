package com.memoryos.controller;

import com.memoryos.dto.ProfileRequest;
import com.memoryos.dto.ProfileResponse;
import com.memoryos.security.SecurityUtils;
import com.memoryos.service.ProfileService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/profile")
public class ProfileController {
    private final ProfileService profileService;

    public ProfileController(ProfileService profileService) {
        this.profileService = profileService;
    }

    @GetMapping
    public ProfileResponse getProfile() {
        return profileService.getProfile(SecurityUtils.currentUserId());
    }

    @PutMapping
    public ProfileResponse updateProfile(@Valid @RequestBody ProfileRequest request) {
        return profileService.updateProfile(SecurityUtils.currentUserId(), request);
    }
}
