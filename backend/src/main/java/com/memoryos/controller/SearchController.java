package com.memoryos.controller;

import com.memoryos.dto.MemoryResponse;
import com.memoryos.security.SecurityUtils;
import com.memoryos.service.MemoryService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/search")
public class SearchController {
    private final MemoryService memoryService;

    public SearchController(MemoryService memoryService) {
        this.memoryService = memoryService;
    }

    @GetMapping
    public List<MemoryResponse> search(@RequestParam(name = "q", required = false) String query) {
        return memoryService.search(SecurityUtils.currentUserId(), query);
    }
}
