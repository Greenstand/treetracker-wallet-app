FROM node:20-alpine AS builder

# Add build tools including autoconf for native module compilation
RUN apk add --no-cache python3 make g++ autoconf automake libtool

WORKDIR /app

COPY . .

RUN yarn install

WORKDIR /app/apps/web
RUN yarn build
