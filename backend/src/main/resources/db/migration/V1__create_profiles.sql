-- V1__create_profiles.sql
-- User profiles — one per authenticated user (user_id = Supabase auth.users.id)

CREATE TABLE profiles (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id     UUID NOT NULL UNIQUE,
    display_name VARCHAR(100),
    avatar_url  TEXT,
    bio         TEXT,
    timezone    VARCHAR(50) DEFAULT 'UTC',
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_profiles_user_id ON profiles(user_id);
