// fetches message sent between 'from' and 'to' date exclusive of 'to'
// if 'to' date is not given it brings all messages up to current moment
// 'from' and 'to' dates have to be in 'YYYY-MM-DD' format
async function checkMessage(client, channel, from, to = new Date(new Date().getTime() + (24 * 60 * 60 * 1000)).toISOString().split('T')[0]) {

    const text = `SELECT * from queue.message m WHERE m.channel = '${channel}' and m.created_at>='${from}' and m.created_at<'${to}'`;

    const fetchPromise = new Promise(resolve => {
        client.query(text, (err, res) => {
            if (err) throw Error(`message fetch error: ${err}`);

            return resolve(res.rows);
        })
    });

    return fetchPromise;
};

module.exports = checkMessage;