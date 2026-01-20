/* Replace with your SQL commands */
CREATE TRIGGER new_message_insert_trigger BEFORE INSERT ON queue.message
            FOR EACH ROW EXECUTE PROCEDURE queue.new_message_notify_function();