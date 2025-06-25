# Stage 1: Build the Next.js application
FROM node:20-alpine AS builder

# Install dependencies for native modules and gyp builds
RUN apk add --no-cache \
  python3 \
  make \
  g++ \
  autoconf \
  automake \
  libtool

# Set working directory
WORKDIR /app

# Copy the entire monorepo to resolve workspaces
COPY . .

# Install all workspace dependencies
RUN yarn install

# Build the app specifically from the apps/web directory
WORKDIR /app/apps/web
RUN yarn build

# Stage 2: Serve the production build
FROM node:20-alpine AS runner

# Set the working directory
WORKDIR /app

# Copy the built app and dependencies from builder
COPY --from=builder /app .

# Navigate to the web app directory
WORKDIR /app/apps/web

# Expose the Next.js default port
EXPOSE 3000

# Start the app with wallet_state env loaded
CMD ["sh", "-c", "yarn workspace wallet_state loadEnv && yarn start"]
