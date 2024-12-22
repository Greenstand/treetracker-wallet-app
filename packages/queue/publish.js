// publishes message to a given channel
function publish({ pgClient, channel, data }) {
  const text = `INSERT into queue.message(channel, data) values ($1, $2) RETURNING *`;
  const values = [channel, data];

  pgClient.query(text, values, (err, res) => {
    if (err) throw Error(`insertion error: ${err}`);
    console.log(`postgres message dispatch success: ${res}`);
  });
}

module.exports = publish;
