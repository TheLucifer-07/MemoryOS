package com.memoryos.dto;

import java.util.List;

public record TimelineGroupResponse(
        Integer year,
        Integer month,
        List<MemoryResponse> memories
) {
}
