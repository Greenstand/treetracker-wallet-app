FROM node:18-alpine AS builder
WORKDIR /app
RUN corepack enable && corepack prepare yarn@4.9.4 --activate
ENV PATH=/app/node_modules/.bin:$PATH
COPY apps/user/package.json ./package.json
COPY apps/user/yarn.lock ./yarn.lock
RUN yarn install --silent
COPY apps/user ./
RUN yarn build
RUN yarn install --production --ignore-scripts --prefer-offline
FROM node:18-alpine AS prod
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
EXPOSE 8080
CMD ["node", "dist/src/main.js"]
