const BaseRepository = require('./BaseRepository');

// Message fetching repository
class MessageRepository extends BaseRepository {

    constructor(session) {
        super('queue.message', session);
    }

    async checkMessage(channel, from, to = new Date(new Date().getTime() + (24 * 60 * 60 * 1000)).toISOString().split('T')[0]) {

        const sql = `SELECT * from queue.message m WHERE m.channel = '${channel}' and m.created_at>='${from}' and m.created_at<'${to}'`;

        let object;
        try { 
            object = await this.session.getDB()
        .raw(sql);
        } catch(err) {
            throw Error(`messasge fetch error: ${err}`)
        }

        return object.rows;
    }
};

module.exports = MessageRepository;
