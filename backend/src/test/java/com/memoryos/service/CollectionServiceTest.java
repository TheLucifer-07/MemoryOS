package com.memoryos.service;

import com.memoryos.dto.CollectionRequest;
import com.memoryos.entity.MemoryCollection;
import com.memoryos.exception.ForbiddenException;
import com.memoryos.repository.MemoryCollectionRepository;
import com.memoryos.repository.MemoryRepository;
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
class CollectionServiceTest {
    @Mock
    private MemoryCollectionRepository collectionRepository;

    @Mock
    private MemoryRepository memoryRepository;

    @InjectMocks
    private CollectionService collectionService;

    @Test
    void rejectsCollectionMemoryNotOwnedByCurrentUser() {
        UUID userId = UUID.randomUUID();
        UUID foreignMemoryId = UUID.randomUUID();
        CollectionRequest request = new CollectionRequest("Trips", null, null, Set.of(foreignMemoryId));

        when(memoryRepository.findByIdInAndUserId(Set.of(foreignMemoryId), userId)).thenReturn(List.of());

        assertThatThrownBy(() -> collectionService.createCollection(userId, request))
                .isInstanceOf(ForbiddenException.class)
                .hasMessageContaining("memories do not belong");
    }
}
