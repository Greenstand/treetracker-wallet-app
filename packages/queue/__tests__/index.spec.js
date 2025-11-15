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

    clientID1 = uuid.v4();
    clientID2 = uuid.v4();

    // subscribe clients to a channel, return a promise and verify message/payload from resolved promise
    subscribe({
      pgClient: pgClient,
      channel: messageObj.channel,
      clientID: clientID1,
    }).then(emitter1 => {
      subscribe({
        pgClient: pgClient2,
        channel: messageObj.channel,
        clientID: clientID2,
      }).then(emitter2 => {
        const promise1 = new Promise(resolve => {
          emitter1.on("message", message1 => {
            expect(message1).toMatchObject(messageObj); // eslint-disable-line
            expect(new Date(message1.ack[clientID1])).toBeInstanceOf(Date); // eslint-disable-line
            resolve(message1);
          });
        });

        const promise2 = new Promise(resolve => {
          emitter2.on("message", message2 => {
            expect(message2).toMatchObject(messageObj); // eslint-disable-line
            expect(new Date(message2.ack[clientID2])).toBeInstanceOf(Date); // eslint-disable-line
            resolve(message2);
          });
        });

        Promise.all([promise1, promise2]).then(() => {
          done();
        });
      });
    });

    // publish message to a given channel
    publish({ pgClient, channel: messageObj.channel, data: messageObj.data });
  }, 30000);
});
