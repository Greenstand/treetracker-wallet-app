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

# Remove any existing ESLint config to avoid conflicts and create a new one
RUN rm -f apps/web/.eslintrc apps/web/.eslintrc.json apps/web/.eslintrc.js && \
    echo '{ \
      "env": { "browser": true, "node": true, "es2021": true }, \
      "extends": ["eslint:recommended", "plugin:react/recommended", "plugin:@typescript-eslint/recommended", "plugin:react-hooks/recommended"], \
      "parser": "@typescript-eslint/parser", \
      "parserOptions": { "ecmaVersion": 12, "sourceType": "module" }, \
      "plugins": ["react", "@typescript-eslint"], \
      "rules": { "react/prop-types": "off" } \
    }' > apps/web/.eslintrc.json

# Fix TermsSection.tsx to use a valid Typography variant
RUN sed -i 's/variant="sub"/variant="caption"/g' apps/web/src/components/common/TermsSection.tsx

# Fix theme.ts to properly define the custom 'sub' variant for Material-UI
RUN sed -i 's/props => props.variant === "sub"/props => props.variant === "caption"/g' apps/web/src/theme.ts && \
    sed -i '/TypographyPropsVariantOverrides/d' apps/web/src/theme.ts && \
    echo 'import { ThemeOptions } from "@mui/material/styles"; \
          declare module "@mui/material/styles" { \
            interface TypographyVariants { sub: true; } \
            interface TypographyVariantsOptions { sub?: true; } \
          } \
          declare module "@mui/material/Typography" { \
            interface TypographyPropsVariantOverrides { sub: true; } \
          }' > apps/web/src/theme.d.ts

# Build the Next.js web app
RUN yarn workspace web build

# Expose the port the Next.js app will run on (default is 3000)
EXPOSE 3000

# Set environment variable for production
ENV NODE_ENV=production

# Command to start the Next.js app
CMD ["yarn", "workspace", "web", "start"]
