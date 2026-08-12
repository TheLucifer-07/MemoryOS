package com.memoryos.service;

import org.springframework.stereotype.Service;

@Service
public class AiService {
    private final GeminiService geminiService;

    public AiService(GeminiService geminiService) {
        this.geminiService = geminiService;
    }

    public boolean isConfigured() {
        return geminiService.isConfigured();
    }
}
