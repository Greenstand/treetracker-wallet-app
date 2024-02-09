const expect = require('expect-runtime');

class BaseRepository {
  constructor(tableName, session) {
    expect(tableName).defined();
    this._tableName = tableName;
    this._session = session;
  }

  async getById(id) {
    const object = await this._session
      .getDB()
      .select()
      .table(this._tableName)
      .where('id', id)
      .first();
    return object;
  }

  /*
   * select by filter
   * support: and / or
   * options:
   *  limit: number
   */
  async getByFilter(filter, options) {
    const whereBuilder = function (object, builder) {
      let result = builder;
      if (object.and) {
        expect(Object.keys(object)).lengthOf(1);
        expect(object.and).a(expect.any(Array));
        object.and.forEach((one) => {
          if (one.or) {
            result = result.andWhere((subBuilder) =>
              whereBuilder(one, subBuilder),
            );
          } else {
            expect(Object.keys(one)).lengthOf(1);
            result = result.andWhere(
              Object.keys(one)[0],
              Object.values(one)[0],
            );
          }
        });
      } else if (object.or) {
        expect(Object.keys(object)).lengthOf(1);
        expect(object.or).a(expect.any(Array));
        object.or.forEach((one) => {
          if (one.and) {
            result = result.orWhere((subBuilder) =>
              whereBuilder(one, subBuilder),
            );
          } else {
            expect(Object.keys(one)).lengthOf(1);
            result = result.orWhere(Object.keys(one)[0], Object.values(one)[0]);
          }
        });
      } else {
        result.where(object);
      }
      return result;
    };
    let promise = this._session
      .getDB()
      .select()
      .table(this._tableName)
      .where((builder) => whereBuilder(filter, builder));
    if (options && options.limit) {
      promise = promise.limit(options && options.limit);
    }
    if (options && options.offset) {
      promise = promise.offset(options && options.offset);
    }
    const result = await promise;
    expect(result).a(expect.any(Array));
    return result;
  }

  async countByFilter(filter) {
    const result = await this._session
      .getDB()
      .count()
      .table(this._tableName)
      .where(filter);
    expect(result).match([
      {
        count: expect.any(String),
      },
    ]);
    return parseInt(result[0].count);
  }

  async update(object) {
    const result = await this._session
      .getDB()(this._tableName)
      .update(object)
      .where('id', object.id)
      .returning('*');
    expect(result).match([
      {
        id: expect.any(Number),
      },
    ]);
    return result[0];
  }

  async create(object) {
    const result = await this._session
      .getDB()(this._tableName)
      .insert(object)
      .returning('*');
    expect(result).match([
      {
        id: expect.anything(),
      },
    ]);
    return result[0];
  }
}

module.exports = BaseRepository;
