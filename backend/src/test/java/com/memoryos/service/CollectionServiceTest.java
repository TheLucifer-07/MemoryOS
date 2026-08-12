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
import org.springframework.test.util.ReflectionTestUtils;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
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

    @Test
    void updatesCollectionWithoutReplacingManagedMemoriesCollectionWithImmutableSet() {
        UUID userId = UUID.randomUUID();
        UUID collectionId = UUID.randomUUID();
        MemoryCollection collection = new MemoryCollection();
        ReflectionTestUtils.setField(collection, "id", collectionId);
        collection.setUserId(userId);
        collection.setName("Old name");
        CollectionRequest request = new CollectionRequest("Updated name", null, null, Set.of());

        when(collectionRepository.findWithMemoriesByIdAndUserId(collectionId, userId))
                .thenReturn(Optional.of(collection));
        when(collectionRepository.save(any(MemoryCollection.class))).thenAnswer(invocation -> {
            MemoryCollection saved = invocation.getArgument(0);
            saved.getMemories().clear();
            return saved;
        });

        var response = collectionService.updateCollection(userId, collectionId, request);

        assertThat(response.name()).isEqualTo("Updated name");
        assertThat(collection.getMemories()).isEmpty();
    }
}
