/* Replace with your SQL commands */
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE queue.message (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    channel text,
    data jsonb,
    created_at timestamptz,
    updated_at timestamptz
);
ALTER TABLE queue.message ALTER COLUMN created_at SET DEFAULT now();
ALTER TABLE queue.message ALTER COLUMN updated_at SET DEFAULT now();
