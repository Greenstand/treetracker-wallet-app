# Build the wallet web workspace as a static Next.js export.
FROM node:20-alpine AS build
WORKDIR /app

RUN corepack enable && corepack prepare yarn@4.9.4 --activate

COPY . .
ENV HUSKY=0 \
    CYPRESS_INSTALL_BINARY=0
RUN yarn workspaces focus web

ARG NEXT_PUBLIC_BASE_PATH=/wallet
ARG NEXT_PUBLIC_BASE_URL=http://localhost:8088/wallet
ARG NEXT_PUBLIC_TREETRACKER_USER_API=https://dev-k8s.treetracker.org/wallet/user
ARG NEXT_PUBLIC_TREETRACKER_WALLET_API=https://dev-k8s.treetracker.org/wallet/keycloak
ARG NEXT_PUBLIC_KEYCLOAK_URL=https://dev-k8s.treetracker.org/keycloak
ARG NEXT_PUBLIC_KEYCLOAK_REALM=treetracker
ARG NEXT_PUBLIC_KEYCLOAK_CLIENT_ID=treetracker-wallet-client-fe
ARG NEXT_PUBLIC_MAP_URL=https://dev.treetracker.org

ENV NEXT_PUBLIC_BASE_PATH=$NEXT_PUBLIC_BASE_PATH \
    NEXT_PUBLIC_BASE_URL=$NEXT_PUBLIC_BASE_URL \
    NEXT_PUBLIC_TREETRACKER_USER_API=$NEXT_PUBLIC_TREETRACKER_USER_API \
    NEXT_PUBLIC_TREETRACKER_WALLET_API=$NEXT_PUBLIC_TREETRACKER_WALLET_API \
    NEXT_PUBLIC_KEYCLOAK_URL=$NEXT_PUBLIC_KEYCLOAK_URL \
    NEXT_PUBLIC_KEYCLOAK_REALM=$NEXT_PUBLIC_KEYCLOAK_REALM \
    NEXT_PUBLIC_KEYCLOAK_CLIENT_ID=$NEXT_PUBLIC_KEYCLOAK_CLIENT_ID \
    NEXT_PUBLIC_MAP_URL=$NEXT_PUBLIC_MAP_URL

RUN yarn workspace web build

# Emissary strips /wallet before forwarding; nginx serves the static export.
FROM nginx:1.27-alpine
COPY deployment/local/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/apps/web/out /usr/share/nginx/html
EXPOSE 80
