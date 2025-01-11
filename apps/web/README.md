# Treetracker Wallet Web App

The Treetracker Wallet Web App is a user-friendly interface for managing digital tokens.

### Overview

This web app is built using Next.js and provides a secure and scalable way to manage digital tokens.

### Features

- **Secure token management**
- **Easy token sending and receiving**
- **User-friendly interface**

### Getting Started

#### Clone the Repository

`git clone https://github.com/Greenstand/treetracker-wallet-app`

#### Install Dependencies

`yarn` in the main project directory

#### Start the Development Server

```bash
cd apps/web
yarn dev
```

#### Open the App in your web browser

[http://localhost:3000](http://localhost:3000/)

#### Testing with Cypress

We use Cypress for comprehensive testing of our web app, including:

- **Component Testing**: Testing individual components in isolation to ensure they function correctly. We use Cypress to test the behavior of single components, without rendering the entire application.
- **End-to-End Testing (E2E)**: Testing the entire application flow to ensure it works as expected, from start to finish. We use Cypress to test the entire application, simulating real-world user interactions and workflows.
- **Integration Testing**: Testing how different components or modules interact with each other to ensure they function correctly together. We use Cypress to test how multiple components work together to achieve a specific goal or workflow.

`yarn cy:open` component test or e2e test
`yarn cy:component ` component test
`yarn cy:e2e` e2e test
