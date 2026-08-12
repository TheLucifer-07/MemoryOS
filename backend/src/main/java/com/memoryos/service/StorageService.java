package com.memoryos.service;

import com.memoryos.config.StorageProperties;
import org.springframework.stereotype.Service;

@Service
public class StorageService {
    private final StorageProperties properties;

    public StorageService(StorageProperties properties) {
        this.properties = properties;
    }

    public String bucketName() {
        return properties.getBucket();
    }
}
