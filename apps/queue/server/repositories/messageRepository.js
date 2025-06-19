const BaseRepository = require('./BaseRepository');

// Message fetching repository
class MessageRepository extends BaseRepository {

    constructor(session) {
        super('queue.message', session);
    }

    async checkMessage({channel, from, to = new Date(new Date().getTime() + (24 * 60 * 60 * 1000)).toISOString().split('T')[0], filter=null}) {

        let filterSql = ``;
        if (filter != null) {
            for (const [key, value] of Object.entries(filter)) { // eslint-disable-line
                filterSql += ` and m."data" @> '{"${key}":"${value}"}'`;
            }
        }
        const sql = `SELECT * from queue.message m WHERE m.channel = '${channel}' and m.created_at>='${from}' and m.created_at<'${to}'${filterSql}`;

        let object;
        try {
            object = await this.session.getDB()
                .raw(sql);
        } catch (err) {
            throw Error(`messasge fetch error: ${err}`)
        }
        return object.rows;
    }
};

module.exports = MessageRepository;
