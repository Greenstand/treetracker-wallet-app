-- Enable pgcrypto extension for gen_random_uuid() on PostgreSQL < 13
-- (On PostgreSQL 13+, gen_random_uuid() is built-in; this is a no-op)
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Create the queue schema
CREATE SCHEMA IF NOT EXISTS queue;

-- Create the message table
CREATE TABLE IF NOT EXISTS queue.message (
  id         UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  channel    TEXT NOT NULL,
  data       JSONB NOT NULL DEFAULT '{}'::jsonb,
  ack        JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create a trigger function that sends a NOTIFY with the new row as payload
CREATE OR REPLACE FUNCTION queue.notify_new_message()
RETURNS TRIGGER AS $$
BEGIN
  PERFORM pg_notify(NEW.channel, row_to_json(NEW)::text);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Attach the trigger to the message table (drop first to make idempotent)
DROP TRIGGER IF EXISTS message_notify ON queue.message;
CREATE TRIGGER message_notify
  AFTER INSERT ON queue.message
  FOR EACH ROW
  EXECUTE FUNCTION queue.notify_new_message();
