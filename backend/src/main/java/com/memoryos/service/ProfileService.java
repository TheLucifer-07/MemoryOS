package com.memoryos.service;

import com.memoryos.dto.ProfileRequest;
import com.memoryos.dto.ProfileResponse;
import com.memoryos.entity.Profile;
import com.memoryos.mapper.ProfileMapper;
import com.memoryos.repository.ProfileRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
public class ProfileService {
    private final ProfileRepository profileRepository;

    public ProfileService(ProfileRepository profileRepository) {
        this.profileRepository = profileRepository;
    }

    @Transactional
    public ProfileResponse getProfile(UUID userId) {
        Profile profile = profileRepository.findByUserId(userId)
                .orElseGet(() -> createDefaultProfile(userId));
        return ProfileMapper.toResponse(profile);
    }

    @Transactional
    public ProfileResponse updateProfile(UUID userId, ProfileRequest request) {
        Profile profile = profileRepository.findByUserId(userId)
                .orElseGet(() -> createDefaultProfile(userId));

        profile.setDisplayName(trimToNull(request.displayName()));
        profile.setAvatarUrl(trimToNull(request.avatarUrl()));
        profile.setBio(trimToNull(request.bio()));
        profile.setTimezone(trimToNull(request.timezone()) == null ? "UTC" : request.timezone().trim());

        return ProfileMapper.toResponse(profileRepository.save(profile));
    }

    private Profile createDefaultProfile(UUID userId) {
        Profile profile = new Profile();
        profile.setUserId(userId);
        return profileRepository.save(profile);
    }

    private String trimToNull(String value) {
        if (value == null || value.isBlank()) {
            return null;
        }
        return value.trim();
    }
}
