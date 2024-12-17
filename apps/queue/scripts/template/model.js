const RESOURCE_CAPRepository = require('../repositories/RESOURCE_CAPRepository');

class RESOURCE_CAPModel {
  constructor(session) {
    this._RESOURCERepository = new RESOURCE_CAPRepository(session);
  }

  async getRESOURCE_CAP(filter, limitOptions) {
    return this._RESOURCERepository.getByFilter(filter, limitOptions);
  }

  async createRESOURCE_CAP(RESOURCEObject) {
    return this._RESOURCERepository.create(RESOURCEObject);
  }

  async updateRESOURCE_CAP(RESOURCEObject) {
    return this._RESOURCERepository.update(RESOURCEObject);
  }

  async getRESOURCE_CAPById(RESOURCEId) {
    return this._RESOURCERepository.getById(RESOURCEId);
  }
}

module.exports = RESOURCE_CAPModel;
