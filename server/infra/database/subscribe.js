// subscribes a client to a channel
async function subscribe(client, channel) {

    const notiPromise = new Promise((resolve) => {
        client.on('notification', msg => {
            const newRow = JSON.parse(msg.payload);
            return resolve(newRow);
        });
    });

    client.query(`LISTEN ${channel}`, (err, res) => {
        if (err) throw Error(`subscription error: ${err}`);
        console.log(`subscription success: ${res}`)
    });

    return notiPromise;
}

module.exports = subscribe;