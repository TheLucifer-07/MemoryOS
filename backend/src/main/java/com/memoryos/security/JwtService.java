package com.memoryos.security;

import com.memoryos.config.JwtProperties;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.UUID;

/**
 * Validates JWTs issued by Supabase Auth (or our own issuer in tests).
 * Supabase signs tokens with HS256 using the JWT secret from the project settings.
 */
@Service
public class JwtService {

    private static final Logger log = LoggerFactory.getLogger(JwtService.class);

    private final SecretKey signingKey;
    private final JwtProperties props;

    public JwtService(JwtProperties props) {
        this.props = props;
        if (props.getSecret() == null || props.getSecret().isBlank()) {
            this.signingKey = null;
        } else {
            this.signingKey = Keys.hmacShaKeyFor(props.getSecret().getBytes(StandardCharsets.UTF_8));
        }
    }

    /**
     * Validates the token and returns the subject (user UUID) if valid.
     * Returns null if the token is invalid or expired.
     */
    public UUID extractUserId(String token) {
        try {
            if (signingKey == null) {
                log.warn("JWT_SECRET is not configured; rejecting bearer token");
                return null;
            }

            JwtParserBuilder parser = Jwts.parser()
                    .verifyWith(signingKey);

            if (props.getIssuer() != null && !props.getIssuer().isBlank()) {
                parser.requireIssuer(props.getIssuer());
            }

            Claims claims = parser.build().parseSignedClaims(token).getPayload();

            String subject = claims.getSubject();
            if (subject == null || subject.isBlank()) return null;
            return UUID.fromString(subject);
        } catch (ExpiredJwtException e) {
            log.debug("JWT expired: {}", e.getMessage());
        } catch (JwtException e) {
            log.debug("JWT invalid: {}", e.getMessage());
        } catch (IllegalArgumentException e) {
            log.debug("JWT subject not a valid UUID: {}", e.getMessage());
        }
        return null;
    }

    /** Generate a token — used in tests and future internal flows. */
    public String generateToken(UUID userId) {
        if (signingKey == null) {
            throw new IllegalStateException("JWT_SECRET is not configured");
        }
        Date now = new Date();
        Date expiry = new Date(now.getTime() + props.getExpirationMs());
        return Jwts.builder()
                .subject(userId.toString())
                .issuer(props.getIssuer())
                .issuedAt(now)
                .expiration(expiry)
                .signWith(signingKey)
                .compact();
    }
}
