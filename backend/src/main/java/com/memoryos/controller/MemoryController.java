package com.memoryos.controller;

import com.memoryos.dto.MemoryMapResponse;
import com.memoryos.dto.MemoryRequest;
import com.memoryos.dto.MemoryResponse;
import com.memoryos.security.SecurityUtils;
import com.memoryos.service.MemoryService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/memories")
public class MemoryController {
    private final MemoryService memoryService;

    public MemoryController(MemoryService memoryService) {
        this.memoryService = memoryService;
    }

    @GetMapping
    public List<MemoryResponse> listMemories() {
        return memoryService.listMemories(SecurityUtils.currentUserId());
    }

    @GetMapping("/{id}")
    public MemoryResponse getMemory(@PathVariable UUID id) {
        return memoryService.getMemory(SecurityUtils.currentUserId(), id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public MemoryResponse createMemory(@Valid @RequestBody MemoryRequest request) {
        return memoryService.createMemory(SecurityUtils.currentUserId(), request);
    }

    @PutMapping("/{id}")
    public MemoryResponse updateMemory(@PathVariable UUID id, @Valid @RequestBody MemoryRequest request) {
        return memoryService.updateMemory(SecurityUtils.currentUserId(), id, request);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteMemory(@PathVariable UUID id) {
        memoryService.deleteMemory(SecurityUtils.currentUserId(), id);
    }

    @GetMapping("/map")
    public List<MemoryMapResponse> mapMemories() {
        return memoryService.mapMemories(SecurityUtils.currentUserId());
    }
}
