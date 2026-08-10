-- V3__create_people.sql

CREATE TABLE people (
    id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id      UUID NOT NULL,
    name         VARCHAR(100) NOT NULL,
    avatar_url   TEXT,
    relationship VARCHAR(50),
    notes        TEXT,
    created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_people_user_id ON people(user_id);

-- Many-to-many: memories ↔ people
CREATE TABLE memory_people (
    memory_id UUID NOT NULL REFERENCES memories(id) ON DELETE CASCADE,
    person_id UUID NOT NULL REFERENCES people(id) ON DELETE CASCADE,
    PRIMARY KEY (memory_id, person_id)
);
