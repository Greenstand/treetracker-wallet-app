# Queue service
   
# API Definition

## The send message API

To use the queue client to send a message, call function (example in Javascript):

```
const queueClient = require('queue-client');

queueClient.sendMessage(
    'walletCreated', 
    {
        walletId: '1234',
        createdAt: '2021-01-01'
    }
);

## The receive message API

To use the queue client to receive a message, call function (example in Javascript):

```
const queueClient = require('queue-client');

queueClient.receiveMessage(
    'walletCreated', 
    (message, acknowlege) => {
        console.log(message);
        acknowlege({
            acknowledged: true,
        });
    }
);
```

Note: 

The user of this client decides whether or not to acknowledge the message by calling the callback function `acknowlege`.

The message should include the `ack` field which is the jsonb data in db, so the user of this client can choose to modify the existing `ack` or simply overwrite it.

# Database Schema

The queue service use the database schema: 'queue'.

Tables:

- message

    Columns:

    - id: UUID
    - channel: text
    - data: jsonb
    - created_at: timestamptz
    - updated_at: timestamptz
    - ack: jsonb

Note, the act time could be record in ack column, like this:

```
{ acknowledgedByClientA: {ack: true, timestamp: 2023-03-15 18:37:06.880169-11} acknowledgedByClientB: {ack: true, timestamp: 2023-03-15 18:37:06.880169-11} }
```


# Development toolkit

This repository was created from Greenstand's template for microservice projects.  This means it comes with many development tools that we use for development and deployment.  As a contributor to this repository, you should learn and use these tools.  They are outlined below.

## db-migrate

db-migrate is used to create database tables and other database objects

### setup

create a file named 'database.json' inside the database folder.
inside the file create and populate database secret fields as follows.
DO NOT commit this file as it contains databse connection secrets.

```
{
    "dev": {
      "driver": "pg",
      "user" : "username",
      "password" : "password",
      "database" : "db name",
      "host" : "host name",
      "port" : "port number",
      "schema" : "schema name",
      "ssl" : "ssl"
    }
}
```

### create a migration template

navigate to database folder and run:

```db-migrate create migrationname```

then populate the sql files in migrations/sqls folder with the appropriate postgres scripts.

### execute migrations

to execute the current set of migrations and push them to the database run:

```db-migrate up```

to rollback already executed migrations run:

```db-migrate down```

you can also execute and roll back migrations incrementally by using the '-c' flag as follows:

```db-migrate up -c 2``` or ```db-migrate down -c 3```

for more info on db-migrate visit the documentation at https://db-migrate.readthedocs.io/en/latest/

## Conventional Commits

https://www.conventionalcommits.org/en/v1.0.0/

## husky
husky will check commit messages to make sure they follow the required format

## prettier / lint
## github actions
## mocha


# Getting Started
  
## Project Setup

Open terminal and navigate to a folder to install this project:

```
git clone https://github.com/Greenstand/treetracker-repository-name.git

```
Install all necessary dependencies: 

```
npm install
```
Generate Initial Code:

```
cd scripts
sh generate-resource.sh
```

The above commands would generate an initial set of endpoints for the resource using our defined code structure

### Default development environment setup

1. Ask engineering leads for a doctl dev token

2. Install doctl command line tool
  * MacOS: brew install doctl

3. ./scripts/setup-dev-database-passwords.sh

#### Update an existing API to support ./scripts/setup-dev-database-passwords
1. Copy `.env.*.example` to API root folder
2. Copy `database/database.json.example` to API database folder
3. Copy scripts folder to API root folder
4. Set scripts/vars.sh to have the corret schema name

### Localhost database Setup

This repository using db-migrate to manage database migrations for its schema.

```
cd database/
db-migrate --env dev up
```

If you have not installed db-migrate globally, you can run:

```
cd database/
../node_modules/db-migrate/bin/db-migrate --env dev up
```

Documentation for db-migrate: https://db-migrate.readthedocs.io/en/latest/

# Architecture of this project

Our microservices use multiple layer structure to build the whole system. Similar with MVC structure:

## **Handler**
 *  HTTP Domain
 *  All error and success codes
 *  API payload validation
 *  Calls a service or a model function
   
## **Service**
 *  Orchestration between services and the domain model
    *  Database session
    *  External APIs
    *  Cloud Services (such as RabbitMQ or S3)
      
## **Model**
 *  Domain logic
 *  Accesses repositories
   
## **Repository**
 *  Accesses the database, performs CRUD operations 
 *  One repository for each database table in RDMS


# How to test

## Unit test

To run the unit tests:

```
npm run test-unit
```

## Integration test

All the integration tests are located under folder `__tests__`

To run the integration test:

Run tests:

```
npm run test-integration
```

## Database seeding test
In order to efficiently run our integration tests, we rely on automated database seeding/clearing functions to mock database entries. To test these functions, run:

```
npm run test-seedDB
```

## Suggestion about how to run tests when developing

There is a command in the `package.json`:

```
npm run test-watch
```

By running test with this command, the tests would re-run if any code change happened. And with the `bail` argument, tests would stop when it met the first error, it might bring some convenience when developing.

NOTE: There is another command: `test-watch-debug`, it is the same with `test-watch`, except it set log's level to `debug`.

## Postman

Can also use Postman to test the API manually.

To run a local server with some seed data, run command:

```
npm run server-test
```

This command would run a API server locally, and seed some basic data into DB (the same with the data we used in the integration test).




