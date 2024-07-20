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
    it('subscribes two cilents', async () => {

        //  tree object to be added to table
        const treeObj = {
            latest_capture_id: uuid.v4(),
            age: 1
        }

        // query to create notification function on postgres schema
        let funQueryRes;
        try {
            funQueryRes = await pgClient.query(`CREATE OR REPLACE FUNCTION queue.new_tree_notify_trigger() RETURNS TRIGGER AS $$
            DECLARE
            BEGIN
                PERFORM pg_notify(cast('insert_notification' as text), row_to_json(new)::text);
                RETURN NEW;
            END;
            $$ LANGUAGE plpgsql;`
            );

        } catch (err) {
            throw Error(`posgtres function creation error: ${err}`);
        }


        console.log("function created: ", funQueryRes)

        // query to create trigger on postgres table
        let triggerQueryRes;
        try {
            await pgClient.query(`DROP TRIGGER IF EXISTS new_tree_insert_trigger on queue.tree`)
            triggerQueryRes = await pgClient.query(`CREATE TRIGGER new_tree_insert_trigger BEFORE INSERT ON queue.tree
            FOR EACH ROW EXECUTE PROCEDURE queue.new_tree_notify_trigger();`)
        } catch (err) {
            throw Error(`postgres trigger drop/creation error: ${err}`);
        }

        console.log("trigger created: ", triggerQueryRes);

        // define action during notification
        pgClient.on('notification', msg => {
            const newRow = JSON.parse(msg.payload);
            expect(newRow).toMatchObject(treeObj); // eslint-disable-line
        });

        pgClient2.on('notification', msg => {
            const newRow = JSON.parse(msg.payload);
            expect(newRow).toMatchObject(treeObj); // eslint-disable-line
        });

        // subscribe clients to a postgres channel
        let subscribeQueryRes;
        try {
            subscribeQueryRes = await pgClient.query(`LISTEN insert_notification`);
        } catch (err) {
            throw Error(`postgres channel subscription error: ${err}`);
        }
        console.log("listen notification success: ", subscribeQueryRes);
        let subscribeQueryRes2;
        try {
            subscribeQueryRes2 = await pgClient2.query(`LISTEN insert_notification`);
        } catch (err) {
            throw Error(`postgres channel subscription error: ${err}`);
        }
        console.log("listen notification success: ", subscribeQueryRes2);

        // insert new row to postgres table
        const text = `INSERT into queue.tree(latest_capture_id, age) values ($1, $2) RETURNING *`;
        const values = [treeObj.latest_capture_id, treeObj.age];
        let insertQueryRes
        try {
            insertQueryRes = await pgClient.query(text, values);
        } catch (err) {
            throw Error(`postgres row insertion error: ${err}`);
        }
        console.log("postgres row insertion success: ", insertQueryRes);

    }, 30000)
})