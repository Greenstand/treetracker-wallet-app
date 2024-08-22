const uuid = require('uuid');
const { pgClient, pgClient2 } = require('../../server/infra/database/pgClient');
const subscribe = require('../../server/infra/database/subscribe');
const publish = require('../../server/infra/database/publish');

// test to confrim successful clients' subscription to a postgres channel
describe('subscribes clients to postgres channel and send new message to confirm subscription', () => {
    afterAll((done) => { // eslint-disable-line
        pgClient.end();
        pgClient2.end();
        done();
    })

    // create two clients and confirm their subscription to a channel
    it('subscribes two cilents', (done) => {

        //  tree object to be added to table
        const messageObj = {
            channel: 'whatever',
            data: {
                capture_id: uuid.v4()
            }
        }

        // create notification function on postgres schema
        pgClient.query(`CREATE OR REPLACE FUNCTION queue.new_message_notify_trigger() RETURNS TRIGGER AS $$
            DECLARE
            BEGIN
                PERFORM pg_notify(cast(NEW.channel as text), row_to_json(new)::text);
                RETURN NEW;
            END;
            $$ LANGUAGE plpgsql;`
            , (err, res) => {
                if (err) throw Error(`function creation error: ${err}`)
                console.log("function created: ", res);
            });

        // create trigger on postgres table
        pgClient.query(`DROP TRIGGER IF EXISTS new_message_insert_trigger on queue.message`, (err) => {
            if (err) throw Error(`trigger drop error: ${err}`);
        })
        pgClient.query(`CREATE TRIGGER new_message_insert_trigger BEFORE INSERT ON queue.message
            FOR EACH ROW EXECUTE PROCEDURE queue.new_message_notify_trigger();`, (err, res) => {
            if (err) throw Error(`trigger creation error: ${err}`);
            console.log("trigger created: ", res);
        });

        // subscribe clients to a channel, return a promise and verify message/payload from resolved promise
        Promise.all([
            subscribe(pgClient, messageObj.channel),
            subscribe(pgClient2, messageObj.channel)
        ]).then(values => {
            expect(values[0]).toMatchObject(messageObj); // eslint-disable-line
            expect(values[1]).toMatchObject(messageObj); // eslint-disable-line
            done();
        });

        // publish message to a given channel
        publish(pgClient, messageObj.channel, messageObj.data);
    }, 30000)
})