package com.memoryos.dto;

import jakarta.validation.constraints.Size;

public record ProfileRequest(
        @Size(max = 100) String displayName,
        @Size(max = 2048) String avatarUrl,
        @Size(max = 2000) String bio,
        @Size(max = 50) String timezone
) {
}
