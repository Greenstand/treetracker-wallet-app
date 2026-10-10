// sends message receipt confirmation
async function ack({ pgClient, id, dateStr, clientID }) {
  const sql = `UPDATE queue.message set ack=jsonb_set(ack, ARRAY[$1]::text[], to_jsonb($2::text)) where id=$3`;
  const values = [clientID, dateStr, id];
  const sql2 = `SELECT * FROM queue.message where id=$1`;
  const values2 = [id];

  const selectPromise = new Promise(resolve => {
    pgClient.query(sql, values, err => {
      if (err) throw Error(`ack update error: ${err}`);
    });
    pgClient.query(sql2, values2, (err, res) => {
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
