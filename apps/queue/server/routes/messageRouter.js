const express = require('express');
const Joi = require('joi').extend(require('@joi/date'));
const { handlerWrapper } = require('../utils/utils');
const MessageRepository = require('../repositories/messageRepository');
const Session = require('../infra/database/Session');
const MessageModel = require('../models/Message');


const router = express.Router();

// message router that uses channel and date ranges to fetch past messages
router.get(
    '/',
    handlerWrapper(async (req, res) => {
        const { channel, from, to } = req.query;

        // check query object format
        Joi.assert(
            req.query,
            Joi.object().keys({
                channel: Joi.string().required(),
                from: Joi.date().format('YYYY-MM-DD').required(),
                to: Joi.date().format('YYYY-MM-DD')
            }).unknown(true)
        )

        const filter = {};
        let hasFilter = false;
        for (const [key, value] of Object.entries(req.query)) { // eslint-disable-line
            if (key !== 'channel' && key !== 'from' && key !== 'to') {
                hasFilter = true;
                filter[key] = value;
            }
        }

        const session = new Session();
        const repo = new MessageRepository(session);

        const exe = await MessageModel.getMessage(repo)({ channel, from, to, filter: hasFilter ? filter : null });
        res.send(exe);
        res.end();
    })
);


module.exports = router;