package com.memoryos.controller;

import com.memoryos.dto.CollectionRequest;
import com.memoryos.dto.CollectionResponse;
import com.memoryos.security.SecurityUtils;
import com.memoryos.service.CollectionService;
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
@RequestMapping("/api/v1/collections")
public class CollectionController {
    private final CollectionService collectionService;

    public CollectionController(CollectionService collectionService) {
        this.collectionService = collectionService;
    }

    @GetMapping
    public List<CollectionResponse> listCollections() {
        return collectionService.listCollections(SecurityUtils.currentUserId());
    }

    @GetMapping("/{id}")
    public CollectionResponse getCollection(@PathVariable UUID id) {
        return collectionService.getCollection(SecurityUtils.currentUserId(), id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public CollectionResponse createCollection(@Valid @RequestBody CollectionRequest request) {
        return collectionService.createCollection(SecurityUtils.currentUserId(), request);
    }

    @PutMapping("/{id}")
    public CollectionResponse updateCollection(@PathVariable UUID id, @Valid @RequestBody CollectionRequest request) {
        return collectionService.updateCollection(SecurityUtils.currentUserId(), id, request);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteCollection(@PathVariable UUID id) {
        collectionService.deleteCollection(SecurityUtils.currentUserId(), id);
    }
}
