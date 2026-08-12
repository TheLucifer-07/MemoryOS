package com.memoryos.security;

import com.memoryos.config.SupabaseJwtProperties;
import com.memoryos.config.SupabaseProperties;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThatThrownBy;

class SupabaseJwtConfigTest {
    @Test
    void failsClearlyWhenSupabaseUrlIsMissing() {
        SupabaseProperties supabaseProperties = new SupabaseProperties();
        SupabaseJwtProperties jwtProperties = new SupabaseJwtProperties();
        jwtProperties.setIssuer("https://project.supabase.co/auth/v1");

        assertThatThrownBy(() -> new SupabaseJwtConfig().jwtDecoder(supabaseProperties, jwtProperties))
                .isInstanceOf(IllegalStateException.class)
                .hasMessageContaining("SUPABASE_URL");
    }

    @Test
    void failsClearlyWhenIssuerIsMissing() {
        SupabaseProperties supabaseProperties = new SupabaseProperties();
        supabaseProperties.setUrl("https://project.supabase.co");
        SupabaseJwtProperties jwtProperties = new SupabaseJwtProperties();

        assertThatThrownBy(() -> new SupabaseJwtConfig().jwtDecoder(supabaseProperties, jwtProperties))
                .isInstanceOf(IllegalStateException.class)
                .hasMessageContaining("JWT_ISSUER");
    }
}
