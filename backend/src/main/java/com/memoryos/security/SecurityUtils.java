package com.memoryos.security;

import com.memoryos.exception.UnauthorizedException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

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
        if (auth == null || !auth.isAuthenticated() || !(auth.getPrincipal() instanceof UUID)) {
            throw new UnauthorizedException("Not authenticated");
        }
        return (UUID) auth.getPrincipal();
    }
}
