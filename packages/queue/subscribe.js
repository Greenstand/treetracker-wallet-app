const ack = require("./ack");

// subscribes a client to a channel
async function subscribe({ pgClient, clientID, channel }) {
  const notiPromise = new Promise(resolve => {
    pgClient.on("notification", msg => {
      const newRow = JSON.parse(msg.payload);
      const date = new Date();
      const dateStr = date.toISOString();

      return ack({ pgClient, id: newRow.id, dateStr, clientID }).then(
        response => {
          return resolve(response[0]);
        },
      );
    });
  });

  pgClient.query(`LISTEN ${channel}`, (err, res) => {
    if (err) throw Error(`subscription error: ${err}`);
    console.log(`subscription success: ${res}`);
  });

  return notiPromise;
}

module.exports = subscribe;
