# Treetracker Wallet App: Secure and Easy Token Management

**Greenstand** provides a secure and user-friendly platform for managing your
digital tokens. Sending and receiving tokens takes just a few taps, making it a
breeze to transfer them between users.

## Quick get start

- Install

```
yarn --frozen-lockfile
```

- Run user api

1. Set up config at: apps/user/.dev.env

```
PRIVATE_KEYCLOAK_CLIENT_SECRET = [ask mainainter about this]
```

(There might be a failure because of connectiong to DB for queue reading, can be
disabled by remove module here:

"apps/user/src/app.module.ts"

```typescript
@Module({
  imports: [
    UserModule,
    HttpModule,
    //QueueModule, // comment out this line
    ConfigModule.forRoot({ envFilePath: ENV === "dev" ? ".dev.env" : ".env" }),
    AuthModule,
  ],
  controllers: [UserController],
  providers: [UserService, AuthService],
})
export class AppModule {}
```

2. Run the user API server

```
yarn user:web
```

- Run web e2e test

```
yarn cypress-e2e-test
```

On the panel openning run the e2e test!

By checking the test, you can understand what this project is about, and the
roles of apps in the monorepo: web, user api

3. [option] run all test in headless browser (no GUI)

```
yarn cypress-e2e-headless-test
```

## **Project Structure:**

Treetracker leverages a monorepo structure, meaning it houses multiple projects
in a single repository. This allows for efficient code sharing across different
platforms. Here's a breakdown:

- **`apps/native`:** This directory contains the React Native code for the
  mobile app.

- **`apps/web`:** This directory holds the Next.js code for the web app.

- **`packages/core`:** This shared folder contains the core model layer,
  accessible by both the mobile and web apps.

## **Getting Started:**

Excited to dive in? Here's how to get up and running:

1.  **Clone the repository:** Use
    `git clone https://github.com/Greenstand/treetracker-wallet-app` to grab the
    code.

2.  **Install dependencies:** Run `yarn` in the main project directory to
    install all the necessary tools.

3.  **Start Development Server (Choose your platform):**

- **Web App:** Navigate to the `web` directory and run `yarn dev`. This launches
  the Next.js development server, accessible at http://localhost:3000 in your
  web browser.

- **Mobile App:** Head to the `native` directory and run `yarn start`. This
  starts the Expo development server for your mobile app.

## **Changelog**

We use
[Conventional Changelog](https://github.com/conventional-changelog/conventional-changelog)
to generate our changelog. This means that all changes should be committed using
the Conventional Commits format.

Here are some examples of commit messages and how they would appear in the
changelog:

- **feat:** A new feature Commit message:
  `feat: add support for token transfers`

- **fix:** A bug fix Commit message:
  `fix: prevent token balance from being negative`

- **docs:** An update to documentation Commit message:
  `docs: add instructions for contributing`

## **Contributing:**

We value your input! Here's how to contribute:

- **Found a bug or have an idea?** Open an issue on our GitHub repository.

- **Want to add code?** Fork the repository, make your changes, and submit a
  pull request.

- **Testing and Documentation Matter:** Ensure your code is well-tested and
  adheres to our coding standards before submitting.

**Thank You!**

We appreciate your interest in contributing to Treetracker. Your time and effort
are invaluable in making this project even better!

**For further details, explore the individual project READMEs:**

- Web App: [Web README](apps/web/README.md)

- Mobile App: [Native README](apps/native/README.md)

- Core Model Layer: [Packages README](packages/core/README.md)

<!-- trigger -->
