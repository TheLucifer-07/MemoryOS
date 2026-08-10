package com.memoryos.mapper;

import com.memoryos.dto.MemoryMapResponse;
import com.memoryos.dto.MemoryResponse;
import com.memoryos.entity.Memory;

public final class MemoryMapper {
    private MemoryMapper() {
    }

    public static MemoryResponse toResponse(Memory memory) {
        var people = memory.getPeople().stream()
                .map(PersonMapper::toSummary)
                .sorted(PersonMapper.summaryNameComparator())
                .toList();

        return new MemoryResponse(
                memory.getId(),
                memory.getUserId(),
                memory.getTitle(),
                memory.getDescription(),
                memory.getStory(),
                memory.getMemoryDate(),
                memory.getLocationName(),
                memory.getLatitude(),
                memory.getLongitude(),
                memory.getVisibility(),
                people,
                memory.getCreatedAt(),
                memory.getUpdatedAt()
        );
    }

    public static MemoryMapResponse toMapResponse(Memory memory) {
        return new MemoryMapResponse(
                memory.getId(),
                memory.getTitle(),
                memory.getMemoryDate(),
                memory.getLatitude(),
                memory.getLongitude(),
                null
        );
    }
}
