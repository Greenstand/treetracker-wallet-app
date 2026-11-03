const RESOURCE_CAPModel = require('../models/RESOURCE_CAP');
const Session = require('../infra/database/Session');

class RESOURCE_CAPService {
  constructor() {
    this._session = new Session();
    this._RESOURCEModel = new RESOURCE_CAPModel(this._session);
  }

  async getRESOURCE_CAP(filter, limitOptions) {
    return this._RESOURCEModel.getRESOURCE_CAP(filter, limitOptions);
  }

  async createRESOURCE_CAP(RESOURCEObject) {
    try {
      await this._session.beginTransaction();
      const response = await this._RESOURCEModel.createRESOURCE_CAP(
        RESOURCEObject,
      );
      await this._session.commitTransaction();

      return response;
    } catch (e) {
      if (this._session.isTransactionInProgress()) {
        await this._session.rollbackTransaction();
      }
      throw e;
    }
  }

  async updateRESOURCE_CAP(RESOURCEObject) {
    try {
      await this._session.beginTransaction();
      const response = await this._RESOURCEModel.updateRESOURCE_CAP(
        RESOURCEObject,
      );
      await this._session.commitTransaction();

      return response;
    } catch (e) {
      if (this._session.isTransactionInProgress()) {
        await this._session.rollbackTransaction();
      }
      throw e;
    }
  }

  async getRESOURCE_CAPById(RESOURCEId) {
    return this._RESOURCEModel.getRESOURCE_CAPById(RESOURCEId);
  }
}

module.exports = RESOURCE_CAPService;
