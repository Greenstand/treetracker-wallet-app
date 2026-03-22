CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE SCHEMA IF NOT EXISTS queue;

CREATE TABLE IF NOT EXISTS queue.message (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  channel TEXT NOT NULL,
  data JSONB,
  ack JSONB DEFAULT '{}'
);

CREATE OR REPLACE FUNCTION queue.notify_message()
RETURNS TRIGGER AS $$
BEGIN
  PERFORM pg_notify(NEW.channel, row_to_json(NEW)::text);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS message_notify ON queue.message;

CREATE TRIGGER message_notify
AFTER INSERT ON queue.message
FOR EACH ROW EXECUTE FUNCTION queue.notify_message();
