/* Replace with your SQL commands */
CREATE TRIGGER date_update_trigger BEFORE UPDATE ON queue.message
    FOR EACH ROW EXECUTE PROCEDURE queue.date_update_function();