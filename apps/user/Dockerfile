FROM node:18-alpine AS builder
WORKDIR /app
ENV PATH=/app/node_modules/.bin:$PATH
COPY package.json ./
RUN yarn install --silent 
COPY . .
RUN yarn build
RUN yarn install --production --ignore-scripts --prefer-offline
FROM node:18-alpine AS prod
WORKDIR /app
COPY --from=builder app/dist/ ./dist
COPY --from=builder app/node_modules ./node_modules
EXPOSE 8080
CMD ["node", "dist/src/main.js"]