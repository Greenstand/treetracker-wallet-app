const express = require('express');
const log = require('loglevel');
const { handlerWrapper } = require('../utils/utils');
const { work, sendJob } = require('../infra/database/queue');


const router = express.Router();

router.post(
    '/',
    handlerWrapper(async (req, res) => {
        const { payload, jobName } = req.body;
        log.info(`sending job with name" ${jobName} and payload: ${JSON.stringify(payload, null, '\t')}`)
        await sendJob(jobName, payload).then(async ()=> {
            await work(jobName, async job=> {
                log.info("worked on job...", job);
                res.send({job});
                res.end();
            })
        })
    })
);


module.exports = router;