package com.memoryos.service;

import com.memoryos.dto.MemoryMapResponse;
import com.memoryos.dto.MemoryRequest;
import com.memoryos.dto.MemoryResponse;
import com.memoryos.dto.TimelineGroupResponse;
import com.memoryos.entity.Memory;
import com.memoryos.entity.Person;
import com.memoryos.entity.Visibility;
import com.memoryos.exception.ForbiddenException;
import com.memoryos.exception.ResourceNotFoundException;
import com.memoryos.mapper.MemoryMapper;
import com.memoryos.repository.MemoryRepository;
import com.memoryos.repository.PersonRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.Comparator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class MemoryService {
    private final MemoryRepository memoryRepository;
    private final PersonRepository personRepository;

    public MemoryService(MemoryRepository memoryRepository, PersonRepository personRepository) {
        this.memoryRepository = memoryRepository;
        this.personRepository = personRepository;
    }

    @Transactional
    public MemoryResponse createMemory(UUID userId, MemoryRequest request) {
        Memory memory = new Memory();
        memory.setUserId(userId);
        applyRequest(memory, request, userId);
        return MemoryMapper.toResponse(memoryRepository.save(memory));
    }

    @Transactional(readOnly = true)
    public List<MemoryResponse> listMemories(UUID userId) {
        return memoryRepository.findByUserIdOrderByMemoryDateDescCreatedAtDesc(userId).stream()
                .map(MemoryMapper::toResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public MemoryResponse getMemory(UUID userId, UUID id) {
        return MemoryMapper.toResponse(loadOwnedMemory(userId, id));
    }

    @Transactional
    public MemoryResponse updateMemory(UUID userId, UUID id, MemoryRequest request) {
        Memory memory = loadOwnedMemory(userId, id);
        applyRequest(memory, request, userId);
        return MemoryMapper.toResponse(memoryRepository.save(memory));
    }

    @Transactional
    public void deleteMemory(UUID userId, UUID id) {
        Memory memory = loadOwnedMemory(userId, id);
        memoryRepository.delete(memory);
    }

    @Transactional(readOnly = true)
    public List<TimelineGroupResponse> timeline(UUID userId) {
        LinkedHashMap<TimelineKey, List<MemoryResponse>> grouped = listMemories(userId).stream()
                .collect(Collectors.groupingBy(
                        memory -> TimelineKey.from(memory.memoryDate()),
                        LinkedHashMap::new,
                        Collectors.toList()
                ));

        return grouped.entrySet().stream()
                .map(entry -> new TimelineGroupResponse(entry.getKey().year(), entry.getKey().month(), entry.getValue()))
                .toList();
    }

    @Transactional(readOnly = true)
    public List<MemoryMapResponse> mapMemories(UUID userId) {
        return memoryRepository.findByUserIdAndLatitudeIsNotNullAndLongitudeIsNotNullOrderByMemoryDateDescCreatedAtDesc(userId)
                .stream()
                .map(MemoryMapper::toMapResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public List<MemoryResponse> search(UUID userId, String query) {
        if (query == null || query.isBlank()) {
            return List.of();
        }

        return memoryRepository.searchByUserId(userId, query.trim()).stream()
                .map(MemoryMapper::toResponse)
                .toList();
    }

    private Memory loadOwnedMemory(UUID userId, UUID id) {
        Memory memory = memoryRepository.findWithPeopleById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Memory not found"));
        if (!memory.getUserId().equals(userId)) {
            throw new ForbiddenException("You do not have access to this memory");
        }
        return memory;
    }

    private void applyRequest(Memory memory, MemoryRequest request, UUID userId) {
        memory.setTitle(request.title().trim());
        memory.setDescription(trimToNull(request.description()));
        memory.setStory(trimToNull(request.story()));
        memory.setMemoryDate(request.memoryDate());
        memory.setLocationName(trimToNull(request.locationName()));
        memory.setLatitude(request.latitude());
        memory.setLongitude(request.longitude());
        memory.setVisibility(request.visibility() == null ? Visibility.PRIVATE : request.visibility());
        memory.setPeople(resolvePeople(userId, request.personIds()));
    }

    private Set<Person> resolvePeople(UUID userId, Set<UUID> personIds) {
        if (personIds == null || personIds.isEmpty()) {
            return Set.of();
        }

        List<Person> people = personRepository.findByIdInAndUserId(personIds, userId);
        if (people.size() != personIds.size()) {
            throw new ForbiddenException("One or more people do not belong to the current user");
        }
        return Set.copyOf(people);
    }

    private String trimToNull(String value) {
        if (value == null || value.isBlank()) {
            return null;
        }
        return value.trim();
    }

    private record TimelineKey(Integer year, Integer month) {
        static TimelineKey from(LocalDate date) {
            if (date == null) {
                return new TimelineKey(null, null);
            }
            return new TimelineKey(date.getYear(), date.getMonthValue());
        }
    }
}
