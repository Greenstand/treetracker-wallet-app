# Stage 1: Build the Next.js application
FROM node:20-alpine AS builder

# Install system dependencies for native modules
RUN apk add --no-cache \
  python3 \
  make \
  g++ \
  autoconf \
  automake \
  libtool

WORKDIR /app

# Copy the entire monorepo for workspace and module resolution
COPY . .

# Install dependencies (workspace-aware)
RUN yarn install

# Build the app from the apps/web directory
WORKDIR /app/apps/web
RUN yarn build

# Stage 2: Serve the production build
FROM node:20-alpine AS runner

WORKDIR /app

# Copy the entire monorepo from builder (includes build output and workspaces)
COPY --from=builder /app .

WORKDIR /app/apps/web

EXPOSE 3000

# Run the wallet_state environment loader before starting Next.js
CMD ["sh", "-c", "yarn workspace wallet_state loadEnv && yarn start"]

