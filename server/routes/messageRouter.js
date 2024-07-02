const express = require('express');
const { handlerWrapper } = require('../utils/utils');
const { sendJob, fetchJobById } = require('../infra/database/queue');

const router = express.Router();

router.post(
    '/',
    handlerWrapper(async (req, res) => {
        const { jobName, payload } = req.body;
        await sendJob(jobName, payload).then(jobId => {
            fetchJobById(jobId).then(job => {
                res.send({ job });
                res.end();
            })
        })
    })
);



module.exports = router;