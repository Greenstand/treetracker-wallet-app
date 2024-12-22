// sends message receipt confirmation
async function ack({ pgClient, id, dateStr, clientID }) {
  const sql = `UPDATE queue.message set ack=jsonb_set(ack, '{${clientID}}', '"${dateStr}"') where id='${id}'`;
  const sql2 = `SELECT * from queue.message where id='${id}'`;

  const selectPromise = new Promise(resolve => {
    pgClient.query(sql, err => {
      if (err) throw Error(`ack update error: ${err}`);
    });
    pgClient.query(sql2, (err, res) => {
      if (err) throw Error(`ack fetch error: ${err}`);

      const date1 = new Date(dateStr);
      const date2 = new Date(res.rows[0].ack[clientID]);

      // checks for the correct acknowledgement date
      if (date1.getTime() !== date2.getTime())
        throw Error("ack timestamp error!");

      resolve(res.rows);
    });
  });
  return selectPromise;
}

module.exports = ack;
