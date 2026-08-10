package com.memoryos.security;

import com.memoryos.config.JwtProperties;
import org.junit.jupiter.api.Test;

import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;

class JwtServiceTest {
    @Test
    void validatesSignatureIssuerAndSubject() {
        JwtProperties properties = new JwtProperties();
        properties.setIssuer("memoryos-test");
        properties.setSecret("0123456789012345678901234567890123456789012345678901234567890123");
        JwtService jwtService = new JwtService(properties);
        UUID userId = UUID.randomUUID();

        String token = jwtService.generateToken(userId);

        assertThat(jwtService.extractUserId(token)).isEqualTo(userId);
    }

    @Test
    void rejectsWrongIssuer() {
        JwtProperties goodProperties = new JwtProperties();
        goodProperties.setIssuer("memoryos-test");
        goodProperties.setSecret("0123456789012345678901234567890123456789012345678901234567890123");
        String token = new JwtService(goodProperties).generateToken(UUID.randomUUID());

        JwtProperties badProperties = new JwtProperties();
        badProperties.setIssuer("different-issuer");
        badProperties.setSecret(goodProperties.getSecret());

        assertThat(new JwtService(badProperties).extractUserId(token)).isNull();
    }
}
