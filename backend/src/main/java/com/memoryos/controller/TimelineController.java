package com.memoryos.controller;

import com.memoryos.dto.TimelineGroupResponse;
import com.memoryos.security.SecurityUtils;
import com.memoryos.service.MemoryService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/timeline")
public class TimelineController {
    private final MemoryService memoryService;

    public TimelineController(MemoryService memoryService) {
        this.memoryService = memoryService;
    }

    @GetMapping
    public List<TimelineGroupResponse> timeline() {
        return memoryService.timeline(SecurityUtils.currentUserId());
    }
}
