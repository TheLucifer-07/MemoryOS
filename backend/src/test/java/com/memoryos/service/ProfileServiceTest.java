package com.memoryos.service;

import com.memoryos.dto.ProfileRequest;
import com.memoryos.entity.Profile;
import com.memoryos.repository.ProfileRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class ProfileServiceTest {
    @Mock
    private ProfileRepository profileRepository;

    @InjectMocks
    private ProfileService profileService;

    @Test
    void createsDefaultProfileForAuthenticatedUserWhenMissing() {
        UUID userId = UUID.randomUUID();
        when(profileRepository.findByUserId(userId)).thenReturn(Optional.empty());
        when(profileRepository.save(any(Profile.class))).thenAnswer(invocation -> invocation.getArgument(0));

        var response = profileService.getProfile(userId);

        assertThat(response.userId()).isEqualTo(userId);
        assertThat(response.timezone()).isEqualTo("UTC");
    }

    @Test
    void updatesOnlyAuthenticatedUsersProfile() {
        UUID userId = UUID.randomUUID();
        Profile profile = new Profile();
        profile.setUserId(userId);
        when(profileRepository.findByUserId(userId)).thenReturn(Optional.of(profile));
        when(profileRepository.save(any(Profile.class))).thenAnswer(invocation -> invocation.getArgument(0));

        var response = profileService.updateProfile(userId, new ProfileRequest(" Maya ", null, "Bio", "Asia/Kolkata"));

        assertThat(response.userId()).isEqualTo(userId);
        assertThat(response.displayName()).isEqualTo("Maya");
        assertThat(response.timezone()).isEqualTo("Asia/Kolkata");
    }
}
