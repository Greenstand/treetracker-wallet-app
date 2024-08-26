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

    // fetch past messages and check response
    it('message?channel=tree&from=2024-08-10&to=2024-08-23', (done) => {

        // check past messages between the given start and end dates on tree channel
        supertest(app).get('/message?channel=tree&from=2024-08-10&to=2024-08-23').then(res => {
            expect(res.status).toBe(200); // eslint-disable-line
            expect(res.body.length).toBe(2); // eslint-disable-line
            expect(res.body[0]).toMatchObject( // eslint-disable-line
                {
                    "id": "9a02e4bd-ab0f-42df-b6ea-f2ffaedafa4d",
                    "channel": "tree",
                    "data": {
                        "capture_id": "baf29ea3-5a9f-4c1a-b338-d6676e37ada8"
                    },
                    "created_at": "2024-08-16T20:15:07.900Z",
                    "updated_at": "2024-08-16T20:15:07.900Z"
                }
            )
        }).finally(() => {
            knex.destroy();
            done();
        });
    }, 30000);
})