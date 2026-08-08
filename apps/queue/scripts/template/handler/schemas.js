const Joi = require('joi');

const RESOURCEPostSchema = Joi.object({});

const RESOURCEQuerySchema = Joi.object({});

const RESOURCEIdParamSchema = Joi.object({});

const RESOURCEPatchSchema = Joi.object({});

module.exports = {
  RESOURCEIdParamSchema,
  RESOURCEPatchSchema,
  RESOURCEPostSchema,
  RESOURCEQuerySchema,
};
