-- V4__create_collections.sql

CREATE TABLE collections (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id         UUID NOT NULL,
    name            VARCHAR(100) NOT NULL,
    description     TEXT,
    cover_image_url TEXT,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_collections_user_id ON collections(user_id);

-- Many-to-many: collections ↔ memories
CREATE TABLE collection_memories (
    collection_id UUID NOT NULL REFERENCES collections(id) ON DELETE CASCADE,
    memory_id     UUID NOT NULL REFERENCES memories(id) ON DELETE CASCADE,
    PRIMARY KEY (collection_id, memory_id)
);
