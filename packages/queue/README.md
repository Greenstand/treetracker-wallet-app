# Postgres based pub/sub message queue system

## To publish message to postgre DB

```
publish({
    pgClient, // postgres client connection url
    channel, // channel id of publisher
    data // data sent by pubblisher
})
```

## To subscribe to a channel

```
subscribe({
    pgClient, // postgres client connection url
    clientID, // client id of subscriber
    channel // channel id client is subscribing to
})
```

## To run e2e test

`NODE_TLS_REJECT_UNAUTHORIZED=0 DATABASE_URL=[ask admin for this] npm run test`
