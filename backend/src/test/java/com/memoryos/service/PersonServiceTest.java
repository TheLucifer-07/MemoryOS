package com.memoryos.service;

import com.memoryos.dto.PersonRequest;
import com.memoryos.entity.Person;
import com.memoryos.exception.ForbiddenException;
import com.memoryos.repository.MemoryRepository;
import com.memoryos.repository.PersonRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Set;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class PersonServiceTest {
    @Mock
    private PersonRepository personRepository;

    @Mock
    private MemoryRepository memoryRepository;

    @InjectMocks
    private PersonService personService;

    @Test
    void rejectsMemoryRelationshipNotOwnedByCurrentUser() {
        UUID userId = UUID.randomUUID();
        UUID foreignMemoryId = UUID.randomUUID();
        PersonRequest request = new PersonRequest("Maya", null, "Friend", null, Set.of(foreignMemoryId));

        when(personRepository.save(any(Person.class))).thenAnswer(invocation -> invocation.getArgument(0));
        when(memoryRepository.findByIdInAndUserId(Set.of(foreignMemoryId), userId)).thenReturn(List.of());

        assertThatThrownBy(() -> personService.createPerson(userId, request))
                .isInstanceOf(ForbiddenException.class)
                .hasMessageContaining("memories do not belong");
    }
}
