DROP TRIGGER IF EXISTS message_notify ON queue.message;
DROP FUNCTION IF EXISTS queue.notify_new_message();
DROP TABLE IF EXISTS queue.message;
DROP SCHEMA IF EXISTS queue;
