const RESOURCE_CAPService = require('../../services/RESOURCE_CAPService');
const HttpError = require('../../utils/HttpError');
const {
  getFilterAndLimitOptions,
  generatePrevAndNext,
} = require('../../utils/helper');
const {
  RESOURCEIdParamSchema,
  RESOURCEPatchSchema,
  RESOURCEPostSchema,
  RESOURCEQuerySchema,
} = require('./schemas');

const RESOURCEHandlerGet = async (req, res) => {
  await RESOURCEQuerySchema.validateAsync(req.query, {
    abortEarly: true,
  });

  const { filter, limitOptions } = getFilterAndLimitOptions(req.query);

  const RESOURCEService = new RESOURCE_CAPService();
  const { RESOURCEs, count } = await RESOURCEService.getRESOURCE_CAP(
    filter,
    limitOptions,
  );

  const url = 'RESOURCE_SNAKE_CASE';

  const links = generatePrevAndNext({
    url,
    count,
    limitOptions,
    queryObject: { ...filter, ...limitOptions },
  });

  res.send({
    RESOURCE_SNAKE_CASEs: RESOURCEs,
    links,
    count,
    query: { ...limitOptions, ...filter },
  });
};

const RESOURCEHandlerPost = async (req, res) => {
  await RESOURCEPostSchema.validateAsync(req.body, { abortEarly: false });

  const RESOURCEService = new RESOURCE_CAPService();
  const RESOURCE = await RESOURCEService.createRESOURCE_CAP(req.body);

  res.send(RESOURCE);
};

const RESOURCEHandlerPatch = async (req, res) => {
  await RESOURCEIdParamSchema.validateAsync(req.params);
  await RESOURCEPatchSchema.validateAsync(req.body, { abortEarly: false });
  const RESOURCEId = req.params.RESOURCE_SNAKE_CASE_id;

  const RESOURCEService = new RESOURCE_CAPService();
  const RESOURCE = await RESOURCEService.updateRESOURCE_CAP({
    id: RESOURCEId,
    ...req.body,
  });

  res.send(RESOURCE);
};

const RESOURCEHandlerSingleGet = async (req, res) => {
  await RESOURCEIdParamSchema.validateAsync(req.params);
  const RESOURCEId = req.params.RESOURCE_SNAKE_CASE_id;

  const RESOURCEService = new RESOURCE_CAPService();
  const RESOURCE = await RESOURCEService.getRESOURCE_CAPById(RESOURCEId);

  if (!RESOURCE) {
    throw new HttpError(404, `RESOURCE_SPLIT with ${RESOURCEId} not found`);
  }

  res.send(RESOURCE);
};

module.exports = {
  RESOURCEHandlerGet,
  RESOURCEHandlerPost,
  RESOURCEHandlerSingleGet,
  RESOURCEHandlerPatch,
};
