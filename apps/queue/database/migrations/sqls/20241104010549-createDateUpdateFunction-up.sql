/* Replace with your SQL commands */
CREATE OR REPLACE FUNCTION queue.date_update_function() RETURNS TRIGGER AS $$
    DECLARE
    BEGIN
        NEW.updated_at = now();
        RETURN NEW;
    END;
    $$ LANGUAGE plpgsql;