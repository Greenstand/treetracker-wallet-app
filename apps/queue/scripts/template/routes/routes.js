const express = require('express');

const router = express.Router();
const { handlerWrapper } = require('../utils/utils');

const {
  RESOURCEHandlerGet,
  RESOURCEHandlerPost,
  RESOURCEHandlerSingleGet,
  RESOURCEHandlerPatch,
} = require('../handlers/RESOURCEHandler');

router
  .route('/RESOURCE_SNAKE_CASE')
  .get(handlerWrapper(RESOURCEHandlerGet))
  .post(handlerWrapper(RESOURCEHandlerPost));

router
  .route('/RESOURCE_SNAKE_CASE/:RESOURCE_SNAKE_CASE_id')
  .get(handlerWrapper(RESOURCEHandlerSingleGet))
  .patch(handlerWrapper(RESOURCEHandlerPatch));

module.exports = router;
