const uuid = require('uuid');
const { pgClient, pgClient2 } = require('../../server/infra/database/pgClient');

// test to confrim successful clients' subscription to a postgres channel
describe('subscribes clients to postgres channel "new_tree_notification" and adds new tree record to confirm subscription', () => {
    afterAll((done) => { // eslint-disable-line
        pgClient.end();
        pgClient2.end();
        done();
    })

    // creates two clients and confirms their subscription to a postgres channel
    it('subscribes two cilents', (done) => {

        //  tree object to be added to table
        const messageObj = {
            name: 'tree',
            data: {
                capture_id: uuid.v4()
            }
        }

        // query to create notification function on postgres schema
        pgClient.query(`CREATE OR REPLACE FUNCTION queue.new_message_notify_trigger() RETURNS TRIGGER AS $$
            DECLARE
            BEGIN
                CASE NEW.name
                    WHEN 'tree' THEN
                        PERFORM pg_notify(cast('tree_notification' as text), row_to_json(new)::text);
                        RETURN NEW;
                    WHEN 'planter' THEN
                        PERFORM pg_notify(cast('planter_notification' as text), row_to_json(new)::text);
                        RETURN NEW;
                    ELSE
                        RETURN NEW;
                END CASE;
            END;
            $$ LANGUAGE plpgsql;`
            , (err, res) => {
                if (err) throw Error(`function creation error: ${err}`)
                console.log("function created: ", res);
            });

        // query to create trigger on postgres table
        pgClient.query(`DROP TRIGGER IF EXISTS new_message_insert_trigger on queue.message`, (err) => {
            if (err) throw Error(`trigger drop error: ${err}`);
        })
        pgClient.query(`CREATE TRIGGER new_message_insert_trigger BEFORE INSERT ON queue.message
            FOR EACH ROW EXECUTE PROCEDURE queue.new_message_notify_trigger();`, (err, res) => {
            if (err) throw Error(`trigger creation error: ${err}`);
            console.log("trigger created: ", res);
        });

        // create promises to receive notifications and verify message/payload
        Promise.all([
            new Promise((resolve) => {
                pgClient.on('notification', msg => {
                    const newRow = JSON.parse(msg.payload);
                    return resolve(newRow);
                });
            }),
            new Promise((resolve) => {
                pgClient2.on('notification', msg => {
                    const newRow = JSON.parse(msg.payload);
                    return resolve(newRow);
                });
            })
        ]).then(values => {
            expect(values[0]).toMatchObject(messageObj); // eslint-disable-line
            expect(values[1]).toMatchObject(messageObj); // eslint-disable-line
            done();
        });

        // subscribe clients to a postgres channel
        pgClient.query(`LISTEN tree_notification`, (err, res) => {
            if (err) throw Error(`subscription error: ${err}`);
            console.log("listen notification success: ", res);
        });

        pgClient2.query(`LISTEN tree_notification`, (err, res) => {
            if (err) throw Error(`subscription error: ${err}`);
            console.log("listen notification success: ", res);
        });

        // insert new row to postgres table, serves same function as sending a message
        const text = `INSERT into queue.message(name, data) values ($1, $2) RETURNING *`;
        const values = [messageObj.name, messageObj.data];

        pgClient.query(text, values, (err, res) => {
            if (err) throw Error(`insertion error: ${err}`);
            console.log("postgres row insertion success: ", res);
        });

    }, 30000)
})