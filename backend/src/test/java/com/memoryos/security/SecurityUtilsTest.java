package com.memoryos.security;

import com.memoryos.exception.UnauthorizedException;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

class SecurityUtilsTest {
    @AfterEach
    void clearContext() {
        SecurityContextHolder.clearContext();
    }

    @Test
    void readsSupabaseUserIdFromJwtSubject() {
        UUID userId = UUID.randomUUID();
        Jwt jwt = Jwt.withTokenValue("redacted")
                .header("alg", "RS256")
                .issuer("https://project.supabase.co/auth/v1")
                .subject(userId.toString())
                .audience(java.util.List.of("authenticated"))
                .issuedAt(Instant.now())
                .expiresAt(Instant.now().plusSeconds(300))
                .build();

        SecurityContextHolder.getContext().setAuthentication(new JwtAuthenticationToken(jwt, List.of()));

        assertThat(SecurityUtils.currentUserId()).isEqualTo(userId);
    }

    @Test
    void rejectsMissingAuthentication() {
        assertThatThrownBy(SecurityUtils::currentUserId)
                .isInstanceOf(UnauthorizedException.class);
    }
}
