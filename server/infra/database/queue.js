const PgBoss = require('pg-boss');
const log = require('loglevel');

require('dotenv').config()


// sends job using job name and and an object containing treeID as payload and returns the job ID
async function sendJob(jobName, payload) {

    const boss = new PgBoss(process.env.DATABASE_URL);

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

    const boss = new PgBoss(process.env.DATABASE_URL);

    boss.on('error', error => console.log(error));
   
    log.info('starting pg-boss...');
    await boss.start();

    log.info(`fetching job with id: ${jobId}`)
    const job = await boss.getJobById(jobId);

    await boss.stop()
    return job;
}

// adds worker for a queue and executes the provided handler when relevant jobs are found
async function work(name, handler) {
    const boss = new PgBoss(process.env.DATABASE_URL);

    boss.on('error', error => console.log(error));
   
    log.info('starting pg-boss...');
    await boss.start();

    log.info(`adding worker for a queue...`);

    return boss.work(name, handler);
}

// subscribes an event to a job name
async function subscribe(event, name) {
    const boss = new PgBoss(process.env.DATABASE_URL);

    boss.on('error', error => console.log(error));
   
    log.info('starting pg-boss...');
    await boss.start();

    log.info(`subscribing queue: ${name} to event: ${event}`);
    return boss.subscribe(event, name);
}

// sends a job along with a payload to a queue based on existing subscribed event and returns the list of job ids
async function publish(event, payload) {
    const boss = new PgBoss(process.env.DATABASE_URL);

    boss.on('error', error => console.log(error));
   
    log.info('starting pg-boss...');
    await boss.start();

    log.info(`publishing event: ${event}`);
    const JobIdArr = await boss.publish(event, payload);

    return JobIdArr;
}


module.exports = {sendJob, fetchJobById, subscribe, publish, work};

