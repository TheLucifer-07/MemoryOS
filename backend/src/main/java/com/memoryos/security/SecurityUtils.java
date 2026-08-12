package com.memoryos.security;

import com.memoryos.exception.UnauthorizedException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;

import java.util.UUID;

public final class SecurityUtils {

    private SecurityUtils() {}

    /**
     * Returns the authenticated user's UUID from the SecurityContext.
     * Throws UnauthorizedException if not authenticated.
     * The backend NEVER trusts a user ID from the request body.
     */
    public static UUID currentUserId() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null || !auth.isAuthenticated()) {
            throw new UnauthorizedException("Not authenticated");
        }

        if (auth.getPrincipal() instanceof Jwt jwt) {
            return parseUserId(jwt.getSubject());
        }

        if (auth.getPrincipal() instanceof UUID userId) {
            return userId;
        }

        return parseUserId(auth.getName());
    }

    private static UUID parseUserId(String subject) {
        if (subject == null || subject.isBlank()) {
            throw new UnauthorizedException("Authenticated token is missing a subject");
        }
        try {
            return UUID.fromString(subject);
        } catch (IllegalArgumentException ex) {
            throw new UnauthorizedException("Authenticated subject is not a valid user ID");
        }
    }
}
