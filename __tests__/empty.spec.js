require('dotenv').config();
const _chai = require('chai');
const _request = require('./lib/supertest');

const { _expect } = _chai;
_chai.use(require('chai-like'));
_chai.use(require('chai-things'));
const _server = require('../server/app');
const _knex = require('../server/infra/database/knex');

// Global Seed
const _databaseCleaner = require('../database/seeds/00_job_database_cleaner');

describe('tests.', () => {
  before(async function () {
    await _databaseCleaner.seed(_knex);
  });
});
