const ack = require("./ack");
const EventEmitter = require("events");

// subscribes a client to a channel
async function subscribe({ pgClient, clientID, channel }) {
  const eventEmitter = new EventEmitter();

  // subscribes a client to a channel
  pgClient.query(`LISTEN "${channel}"`, (err, res) => {
    if (err) throw Error(`subscription error: ${err}`);
    console.log(`subscription success: ${res}`);
  });

  // define what to do when a message is received
  pgClient.on("notification", msg => {
    const newRow = JSON.parse(msg.payload);
    const date = new Date();
    const dateStr = date.toISOString();

    // sends message receipt confirmation to DB
    ack({ pgClient, id: newRow.id, dateStr, clientID }).then(response => {
      eventEmitter.emit("message", response[0]);
    });
  });

  return eventEmitter;
}

module.exports = subscribe;
