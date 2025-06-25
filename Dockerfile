# Use the official Node.js 18 image as the base image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and yarn.lock from the root of the monorepo
COPY package.json yarn.lock ./

# Copy the web app directory
COPY apps/web ./apps/web

# Copy the shared core package (if needed by the web app)
COPY packages/core ./packages/core

# Install dependencies using Yarn
RUN yarn install --frozen-lockfile

# Build the Next.js web app
RUN yarn workspace web build

# Expose the port the Next.js app will run on (default is 3000)
EXPOSE 3000

# Set environment variable for production
ENV NODE_ENV=production

# Command to start the Next.js app
CMD ["yarn", "workspace", "web", "start"]
