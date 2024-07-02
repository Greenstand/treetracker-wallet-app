const pgBoss = require('pg-boss');
const log = require('loglevel');

require('dotenv').config()


// sends job using job name and and an object containing treeID as payload and returns the job ID
async function sendJob(jobName, payload) {

    const boss = new pgBoss(process.env.DATABASE_URL); // eslint-disable-line

    boss.on('error', error => console.log(error));

    log.info('starting pg-boss...');
    await boss.start();

    log.info(`sending job with name: ${jobName} and payload: ${payload}`)
    const jobId = await boss.send(jobName, payload);

    await boss.stop();

    log.info(`job with jobId: ${jobId} sent!`)
    return jobId;
}

// fetches existing job using job ID
async function fetchJobById(jobId) {

    const boss = new pgBoss(process.env.DATABASE_URL); // eslint-disable-line

    boss.on('error', error => console.log(error));
   
    log.info('starting pg-boss...');
    await boss.start();

    log.info(`fetching job with id: ${jobId}`)
    const job = await boss.getJobById(jobId);

    await boss.stop()
    return job;
}


module.exports = {sendJob, fetchJobById};

