FROM node:20-alpine AS builder
RUN apk add --no-cache python3 make g++ bash
RUN corepack enable && corepack prepare yarn@4.9.4 --activate
WORKDIR /app
ENV PATH=/app/node_modules/.bin:$PATH
COPY package.json yarn.lock .yarnrc.yml .yarn ./
COPY packages ./packages
COPY apps ./apps

RUN yarn install --silent
WORKDIR /app/apps/user
RUN yarn build
RUN yarn workspaces focus --production
FROM node:20-alpine AS prod

WORKDIR /app
COPY --from=builder /app/apps/user/dist ./dist
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 8080
CMD ["node", "dist/src/main.js"]
