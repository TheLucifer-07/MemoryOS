package com.memoryos.mapper;

import com.memoryos.dto.PersonResponse;
import com.memoryos.dto.PersonSummaryResponse;
import com.memoryos.entity.Memory;
import com.memoryos.entity.Person;

import java.util.Comparator;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

public final class PersonMapper {
    private PersonMapper() {
    }

    public static PersonSummaryResponse toSummary(Person person) {
        return new PersonSummaryResponse(
                person.getId(),
                person.getName(),
                person.getAvatarUrl(),
                person.getRelationship()
        );
    }

    public static PersonResponse toResponse(Person person) {
        Set<UUID> memoryIds = person.getMemories().stream()
                .map(Memory::getId)
                .collect(Collectors.toSet());

        return new PersonResponse(
                person.getId(),
                person.getUserId(),
                person.getName(),
                person.getAvatarUrl(),
                person.getRelationship(),
                person.getNotes(),
                memoryIds,
                person.getCreatedAt(),
                person.getUpdatedAt()
        );
    }

    public static Comparator<PersonSummaryResponse> summaryNameComparator() {
        return Comparator.comparing(PersonSummaryResponse::name, String.CASE_INSENSITIVE_ORDER);
    }
}
