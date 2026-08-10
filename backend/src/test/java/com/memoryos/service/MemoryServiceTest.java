package com.memoryos.service;

import com.memoryos.dto.MemoryRequest;
import com.memoryos.entity.Memory;
import com.memoryos.entity.Visibility;
import com.memoryos.exception.ForbiddenException;
import com.memoryos.repository.MemoryRepository;
import com.memoryos.repository.PersonRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.test.util.ReflectionTestUtils;

import java.time.LocalDate;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class MemoryServiceTest {
    @Mock
    private MemoryRepository memoryRepository;

    @Mock
    private PersonRepository personRepository;

    @InjectMocks
    private MemoryService memoryService;

    @Test
    void createsMemoryForAuthenticatedUser() {
        UUID userId = UUID.randomUUID();
        UUID memoryId = UUID.randomUUID();
        MemoryRequest request = new MemoryRequest(
                "  First picnic  ",
                "By the lake",
                "A quiet afternoon.",
                LocalDate.of(2026, 8, 10),
                "Lake House",
                12.5,
                77.6,
                Visibility.PRIVATE,
                Set.of()
        );

        when(memoryRepository.save(any(Memory.class))).thenAnswer(invocation -> {
            Memory memory = invocation.getArgument(0);
            ReflectionTestUtils.setField(memory, "id", memoryId);
            return memory;
        });

        var response = memoryService.createMemory(userId, request);

        assertThat(response.id()).isEqualTo(memoryId);
        assertThat(response.userId()).isEqualTo(userId);
        assertThat(response.title()).isEqualTo("First picnic");
        verify(memoryRepository).save(any(Memory.class));
    }

    @Test
    void userBCannotAccessUserAMemory() {
        UUID userA = UUID.randomUUID();
        UUID userB = UUID.randomUUID();
        UUID memoryId = UUID.randomUUID();
        Memory memory = new Memory();
        ReflectionTestUtils.setField(memory, "id", memoryId);
        memory.setUserId(userA);
        memory.setTitle("User A memory");

        when(memoryRepository.findWithPeopleById(memoryId)).thenReturn(Optional.of(memory));

        assertThatThrownBy(() -> memoryService.getMemory(userB, memoryId))
                .isInstanceOf(ForbiddenException.class)
                .hasMessageContaining("do not have access");
    }
}
