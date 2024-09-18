const uuid = require('uuid');
const supertest = require('supertest');
const app = require('../../server/app');
const { pgClient, pgClient2 } = require('../../server/infra/database/pgClient');
const subscribe = require('../../server/infra/database/subscribe');
const publish = require('../../server/infra/database/publish');
const knex = require('../../server/infra/database/knex');

// test to confrim successful clients' subscription to a postgres channel
describe('tests client subscription and past message fetching', () => {
    afterAll((done) => { // eslint-disable-line
        pgClient.end();
        pgClient2.end();
        done();
    })

    // create two clients and confirm their subscription to a channel
    it('subscribes two cilents', (done) => {

        //  tree object to be added to table
        const messageObj = {
            channel: 'tree',
            data: {
                capture_id: uuid.v4()
            }
        }

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

     // fetch past messages with a filter and check response
     it('message?channel=tree&from=2024-09-01&to=2024-09-18&name=John', (done) => {

        // check past messages between the given start and end dates on tree channel with a filter
        supertest(app).get('/message?channel=tree&from=2024-09-01&to=2024-09-18&name=John').then(res => {
            expect(res.status).toBe(200); // eslint-disable-line
            expect(res.body.length).toBe(1); // eslint-disable-line
            expect(res.body[0]).toMatchObject( // eslint-disable-line
                {
                    "id": "e334b98b-2c43-4e17-8eee-b6da207c3c52",
                    "channel": "tree",
                    "data": {
                        "name": "John"
                    }
                }
            )
        }).finally(() => {
            knex.destroy();
            done();
        });
    }, 30000);
})