/*
 * A object to indicate current session, currently, use for database session, like a transaction session.
 * So with knowing the current database transaction session, we can easily break the current process, and
 * rollback the operation, and if encounter any accidentally problem or failure, we can rollback all
 * operations.
 *
 */

const knex = require('./knex');

class Session {
  constructor() {
    this.thx = undefined;
  }

  getDB() {
    if (this.thx) {
      return this.thx;
    }
    return knex;
  }

  isTransactionInProgress() {
    return this.thx !== undefined;
  }

  async beginTransaction() {
    if (this.thx) {
      throw new Error('Can not start transaction in transaction');
    }
    this.thx = await knex.transaction();
  }

  async commitTransaction() {
    if (!this.thx) {
      throw new Error('Can not commit transaction before start it!');
    }
    await this.thx.commit();
    this.thx = undefined;
  }

  async rollbackTransaction() {
    if (!this.thx) {
      throw new Error('Can not rollback transaction before start it!');
    }
    await this.thx.rollback();
    this.thx = undefined;
  }
}

module.exports = Session;
