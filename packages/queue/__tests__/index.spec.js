const { pgClient, pgClient2 } = require("../pgClient");
const uuid = require("uuid");
const subscribe = require("../subscribe");
const publish = require("../publish");

// test to confrim successful clients' subscription to a postgres channel
describe("tests client subscription", () => {
  afterAll(done => {
    // eslint-disable-line
    pgClient.end();
    pgClient2.end();
    done();
  });

  // create two clients and confirm their subscription to a channel
  it("subscribes two cilents", done => {
    //  tree object to be added to table
    const messageObj = {
      channel: "tree",
      data: {
        capture_id: uuid.v4(),
      },
    };

    // subscribe clients to a channel, return a promise and verify message/payload from resolved promise
    Promise.all([
      subscribe({ pgClient, channel: messageObj.channel, clientID: uuid.v4() }),
      subscribe({
        pgClient: pgClient2,
        channel: messageObj.channel,
        clientID: uuid.v4(),
      }),
    ]).then(values => {
      expect(values[0]).toMatchObject(messageObj); // eslint-disable-line
      expect(values[1]).toMatchObject(messageObj); // eslint-disable-line
      done();
    });

    // publish message to a given channel
    publish({ pgClient, channel: messageObj.channel, data: messageObj.data });
  }, 30000);
});
