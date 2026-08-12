package com.memoryos.service;

import com.memoryos.config.GeminiProperties;
import org.springframework.stereotype.Service;

@Service
public class GeminiService {
    private final GeminiProperties properties;

    public GeminiService(GeminiProperties properties) {
        this.properties = properties;
    }

    public boolean isConfigured() {
        return properties.isConfigured();
    }
}
