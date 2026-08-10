-- V5__create_media_tags_places_settings.sql

-- Media attached to memories
CREATE TABLE media (
    id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    memory_id    UUID NOT NULL REFERENCES memories(id) ON DELETE CASCADE,
    user_id      UUID NOT NULL,
    media_type   VARCHAR(20) NOT NULL CHECK (media_type IN ('IMAGE', 'VIDEO', 'AUDIO', 'DOCUMENT')),
    storage_path TEXT NOT NULL,
    file_name    VARCHAR(255),
    mime_type    VARCHAR(100),
    file_size    BIGINT,
    created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_media_memory_id ON media(memory_id);
CREATE INDEX idx_media_user_id ON media(user_id);

-- Tags
CREATE TABLE tags (
    id      UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    name    VARCHAR(50) NOT NULL,
    UNIQUE (user_id, name)
);

CREATE INDEX idx_tags_user_id ON tags(user_id);

CREATE TABLE memory_tags (
    memory_id UUID NOT NULL REFERENCES memories(id) ON DELETE CASCADE,
    tag_id    UUID NOT NULL REFERENCES tags(id) ON DELETE CASCADE,
    PRIMARY KEY (memory_id, tag_id)
);

-- Places
CREATE TABLE places (
    id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id    UUID NOT NULL,
    name       VARCHAR(255) NOT NULL,
    latitude   DOUBLE PRECISION,
    longitude  DOUBLE PRECISION,
    address    TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_places_user_id ON places(user_id);

-- User settings
CREATE TABLE settings (
    id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id    UUID NOT NULL UNIQUE,
    theme      VARCHAR(20) DEFAULT 'light',
    timezone   VARCHAR(50) DEFAULT 'UTC',
    language   VARCHAR(10) DEFAULT 'en',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_settings_user_id ON settings(user_id);
