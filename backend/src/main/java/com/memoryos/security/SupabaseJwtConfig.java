package com.memoryos.security;

import com.memoryos.config.SupabaseJwtProperties;
import com.memoryos.config.SupabaseProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.oauth2.jose.jws.SignatureAlgorithm;
import org.springframework.security.oauth2.core.DelegatingOAuth2TokenValidator;
import org.springframework.security.oauth2.core.OAuth2Error;
import org.springframework.security.oauth2.core.OAuth2TokenValidator;
import org.springframework.security.oauth2.core.OAuth2TokenValidatorResult;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.JwtValidators;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;

@Configuration
public class SupabaseJwtConfig {
    @Bean
    public JwtDecoder jwtDecoder(SupabaseProperties supabaseProperties, SupabaseJwtProperties jwtProperties) {
        String supabaseUrl = require("SUPABASE_URL", supabaseProperties.getUrl());
        String issuer = require("JWT_ISSUER", jwtProperties.getIssuer());
        String jwkSetUri = normalizeSupabaseUrl(supabaseUrl) + "/auth/v1/.well-known/jwks.json";

        NimbusJwtDecoder decoder = NimbusJwtDecoder.withJwkSetUri(jwkSetUri)
                .jwsAlgorithm(SignatureAlgorithm.ES256)
                .jwsAlgorithm(SignatureAlgorithm.RS256)
                .build();
        OAuth2TokenValidator<Jwt> validator = new DelegatingOAuth2TokenValidator<>(
                JwtValidators.createDefaultWithIssuer(issuer),
                audienceValidator(jwtProperties.getAudience())
        );
        decoder.setJwtValidator(validator);
        return decoder;
    }

    private OAuth2TokenValidator<Jwt> audienceValidator(String expectedAudience) {
        return jwt -> {
            if (expectedAudience == null || expectedAudience.isBlank() || jwt.getAudience().contains(expectedAudience)) {
                return OAuth2TokenValidatorResult.success();
            }
            OAuth2Error error = new OAuth2Error(
                    "invalid_token",
                    "The required JWT audience is missing.",
                    null
            );
            return OAuth2TokenValidatorResult.failure(error);
        };
    }

    private String require(String name, String value) {
        if (value == null || value.isBlank()) {
            throw new IllegalStateException(name + " must be configured for Supabase JWT verification");
        }
        return value.trim();
    }

    private String normalizeSupabaseUrl(String supabaseUrl) {
        String trimmed = supabaseUrl.trim();
        while (trimmed.endsWith("/")) {
            trimmed = trimmed.substring(0, trimmed.length() - 1);
        }
        return trimmed;
    }
}
