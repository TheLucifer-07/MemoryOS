package com.memoryos.mapper;

import com.memoryos.dto.ProfileResponse;
import com.memoryos.entity.Profile;

public final class ProfileMapper {
    private ProfileMapper() {
    }

    public static ProfileResponse toResponse(Profile profile) {
        return new ProfileResponse(
                profile.getId(),
                profile.getUserId(),
                profile.getDisplayName(),
                profile.getAvatarUrl(),
                profile.getBio(),
                profile.getTimezone(),
                profile.getCreatedAt(),
                profile.getUpdatedAt()
        );
    }
}
