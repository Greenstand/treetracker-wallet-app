/* Replace with your SQL commands */
CREATE OR REPLACE FUNCTION queue.new_message_notify_trigger() RETURNS TRIGGER AS $$
            DECLARE
            BEGIN
                PERFORM pg_notify(cast(NEW.channel as text), row_to_json(new)::text);
                RETURN NEW;
            END;
            $$ LANGUAGE plpgsql;