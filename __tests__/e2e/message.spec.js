const uuid = require('uuid');
const { pgClient, pgClient2 } = require('../../server/infra/database/pgClient');
const subscribe = require('../../server/infra/database/subscribe');
const publish = require('../../server/infra/database/publish');
const checkMessage = require('../../server/infra/database/checkMessage');

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

    it('fetches messages between start and end dates exclusive of the end date', (done)=> {
        // check past messages between the given start and end dates
        Promise.all([
            checkMessage(pgClient, 'whatever', '2024-08-20', '2024-08-21'),
            checkMessage(pgClient, 'whatever', '2024-08-13', '2024-08-16')
        ]).then(values => {
            expect(values[0].length).toBe(13); // eslint-disable-line
            expect(values[1].length).toBe(0); // eslint-disable-line
            done();
        })
    })
})