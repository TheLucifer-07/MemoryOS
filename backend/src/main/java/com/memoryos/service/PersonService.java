package com.memoryos.service;

import com.memoryos.dto.PersonRequest;
import com.memoryos.dto.PersonResponse;
import com.memoryos.entity.Memory;
import com.memoryos.entity.Person;
import com.memoryos.exception.ForbiddenException;
import com.memoryos.exception.ResourceNotFoundException;
import com.memoryos.mapper.PersonMapper;
import com.memoryos.repository.MemoryRepository;
import com.memoryos.repository.PersonRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Set;
import java.util.UUID;

@Service
public class PersonService {
    private final PersonRepository personRepository;
    private final MemoryRepository memoryRepository;

    public PersonService(PersonRepository personRepository, MemoryRepository memoryRepository) {
        this.personRepository = personRepository;
        this.memoryRepository = memoryRepository;
    }

    @Transactional
    public PersonResponse createPerson(UUID userId, PersonRequest request) {
        Person person = new Person();
        person.setUserId(userId);
        applyRequest(person, request);
        Person saved = personRepository.save(person);
        syncMemoryLinks(saved, userId, request.memoryIds());
        return PersonMapper.toResponse(saved);
    }

    @Transactional(readOnly = true)
    public List<PersonResponse> listPeople(UUID userId) {
        return personRepository.findByUserIdOrderByNameAsc(userId).stream()
                .map(PersonMapper::toResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public PersonResponse getPerson(UUID userId, UUID id) {
        return PersonMapper.toResponse(loadOwnedPerson(userId, id));
    }

    @Transactional
    public PersonResponse updatePerson(UUID userId, UUID id, PersonRequest request) {
        Person person = loadOwnedPerson(userId, id);
        applyRequest(person, request);
        Person saved = personRepository.save(person);
        syncMemoryLinks(saved, userId, request.memoryIds());
        return PersonMapper.toResponse(saved);
    }

    @Transactional
    public void deletePerson(UUID userId, UUID id) {
        Person person = loadOwnedPerson(userId, id);
        personRepository.delete(person);
    }

    private Person loadOwnedPerson(UUID userId, UUID id) {
        return personRepository.findWithMemoriesByIdAndUserId(id, userId)
                .orElseThrow(() -> new ResourceNotFoundException("Person not found"));
    }

    private void applyRequest(Person person, PersonRequest request) {
        person.setName(request.name().trim());
        person.setAvatarUrl(trimToNull(request.avatarUrl()));
        person.setRelationship(trimToNull(request.relationship()));
        person.setNotes(trimToNull(request.notes()));
    }

    private void syncMemoryLinks(Person person, UUID userId, Set<UUID> memoryIds) {
        Set<Memory> requestedMemories = resolveMemories(userId, memoryIds);
        Set<UUID> requestedIds = requestedMemories.stream()
                .map(Memory::getId)
                .collect(java.util.stream.Collectors.toSet());

        List<Memory> allUserMemories = memoryRepository.findByUserIdOrderByMemoryDateDescCreatedAtDesc(userId);
        for (Memory memory : allUserMemories) {
            memory.getPeople().removeIf(existing -> existing.getId().equals(person.getId()));
            if (requestedIds.contains(memory.getId())) {
                memory.getPeople().add(person);
            }
        }
        memoryRepository.saveAll(allUserMemories);

        person.getMemories().clear();
        person.getMemories().addAll(requestedMemories);
    }

    private Set<Memory> resolveMemories(UUID userId, Set<UUID> memoryIds) {
        if (memoryIds == null || memoryIds.isEmpty()) {
            return Set.of();
        }

        List<Memory> memories = memoryRepository.findByIdInAndUserId(memoryIds, userId);
        if (memories.size() != memoryIds.size()) {
            throw new ForbiddenException("One or more memories do not belong to the current user");
        }
        return Set.copyOf(memories);
    }

    private String trimToNull(String value) {
        if (value == null || value.isBlank()) {
            return null;
        }
        return value.trim();
    }
}
