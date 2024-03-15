## Deps

I've used version 20 of Node.js
If you have it,
npm ci should do the trick
If you don't, just use docker man

## Tests

Tests can be ran with: npm run test / npm t

## How to run locally

Make sure you have docker installed!

1. Run in shell:
   cp .env.sample .env

2. Run DB in postgres:
   docker compose up -d db

3. Run:
   npm ci && npm run start:dev

4. Go to http://localhost:8080/api and use the app

## How to run in docker

Make sure you have docker installed!

1. Run in shell:
   cp .env.sample .env

2. Run:
   docker-compose up

3. Go to http://localhost:8080/api and use the app
