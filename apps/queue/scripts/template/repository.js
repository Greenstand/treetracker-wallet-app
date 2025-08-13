const BaseRepository = require('./BaseRepository');

class RESOURCE_CAPRepository extends BaseRepository {
  constructor(session) {
    super('RESOURCE_SNAKE_CASE', session);
  }
}

module.exports = RESOURCE_CAPRepository;
