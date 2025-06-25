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

# Fix ESLint configuration by creating a new .eslintrc file
RUN echo '{ \
  "env": { "browser": true, "node": true, "es2021": true }, \
  "extends": ["eslint:recommended", "plugin:react/recommended", "plugin:@typescript-eslint/recommended"], \
  "parser": "@typescript-eslint/parser", \
  "parserOptions": { "ecmaVersion": 12, "sourceType": "module" }, \
  "plugins": ["react", "@typescript-eslint"], \
  "rules": { "react/prop-types": "off" } \
}' > apps/web/.eslintrc.json

# Modify TermsSection.tsx to fix Typography variant issue
RUN sed -i 's/variant="sub"/variant="caption"/g' apps/web/src/components/common/TermsSection.tsx

# Build the Next.js web app
RUN yarn workspace web build

# Expose the port the Next.js app will run on (default is 3000)
EXPOSE 3000

# Set environment variable for production
ENV NODE_ENV=production

# Command to start the Next.js app
CMD ["yarn", "workspace", "web", "start"]
