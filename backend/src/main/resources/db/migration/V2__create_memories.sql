-- V2__create_memories.sql

CREATE TABLE memories (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id         UUID NOT NULL,
    title           VARCHAR(255) NOT NULL,
    description     TEXT,
    story           TEXT,
    memory_date     DATE,
    latitude        DOUBLE PRECISION,
    longitude       DOUBLE PRECISION,
    location_name   VARCHAR(255),
    visibility      VARCHAR(20) NOT NULL DEFAULT 'PRIVATE'
                        CHECK (visibility IN ('PRIVATE', 'SHARED')),
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_memories_user_id ON memories(user_id);
CREATE INDEX idx_memories_memory_date ON memories(memory_date DESC);
CREATE INDEX idx_memories_user_date ON memories(user_id, memory_date DESC);
