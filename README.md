# 🌳 Treetracker Wallet App

[![Next.js](https://img.shields.io/badge/Next.js-14+-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React Native](https://img.shields.io/badge/React%20Native-Expo-000020?style=flat-square&logo=expo)](https://expo.dev/)
[![NestJS](https://img.shields.io/badge/NestJS-Backend-E0234E?style=flat-square&logo=nestjs)](https://nestjs.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5+-3178C6?style=flat-square&logo=typescript)](https://typescriptlang.org/)

> **Secure and user-friendly digital token management platform built by
> Greenstand**

Greenstand offers a secure, user-friendly wallet for seamless token transfers,
built with enterprise-grade security and a scalable monorepo architecture
supporting web, mobile, and backend services.

_Treetracker Wallet App is part of the Greenstand ecosystem, enabling
transparent and verifiable tree planting and forest management through
blockchain technology._

## ⚡ Quick Start

### Prerequisites

- **Node.js** (v20 or higher)
- **Yarn** (v1.22 or higher)
- **Docker** (for backend development)

### 🚀 One-Command Setup

```bash
# Clone, and install dependencies, and start development
git clone https://github.com/Greenstand/treetracker-wallet-app.git
cd treetracker-wallet-app && yarn install
```

### 🏃‍♂️ Start Development

#### Option 1: Quick Web Development

```bash
yarn web:dev
# Opens http://localhost:3000
```

#### Option 2: Full Stack Development

```bash
# Terminal 1: Start backend API
yarn user:dev

# Terminal 2: Start web application
yarn web:dev

# Terminal 3: Start mobile app
yarn native:start
```

### 🧪 Testing

```bash
# Run E2E tests (recommended for understanding the project)
yarn cypress-e2e-test

# Or run headless tests
yarn cypress-e2e-headless-test
```

> 💡 **Tip:** Run the E2E tests to understand what this project does and how the
> apps work together!

## Behavior Driven Development (BDD)

### 🚀 Overview

Added comprehensive end-to-end testing using **WebdriverIO** for the wallet application, covering:

  * ✅ **Login flow** (success & failure cases)
  * ✅ **Wallet creation** process
  * ✅ **User registration** workflow
  * and more

-----

### 🧪 Test Commands

Run these from the repository root:

```bash
# Run all E2E tests
yarn bdd:e2e

# Run specific test suite
yarn bdd:e2e:login
yarn bdd:e2e:register
yarn bdd:e2e:wallet

# Debug mode (verbose output)
yarn bdd:e2e:debug

# Update ChromeDriver (if tests fail)
yarn bdd:e2e:update-driver
```

-----

### 🖼️ Test Evidence

Sample Output:

\<img width="976" height="632" alt="image" src="[https://github.com/user-attachments/assets/456c64cf-b92f-4030-bf96-7b56bfdaa800](https://github.com/user-attachments/assets/456c64cf-b92f-4030-bf96-7b56bfdaa800)" /\>

```bash
$ yarn test:e2e
[chrome] ✔ Login - Valid credentials (4.2s)
[chrome] ✔ Wallet Creation - Basic flow (6.1s)
[chrome] ✔ Registration - Email signup (5.8s)
```

-----

### ✅ Verification Checklist

  * All tests pass locally (`yarn test:e2e`)
  * No production code modified
  * Test data follows PII guidelines
  * ChromeDriver version (v136) matches CI
  * Documentation updated if needed

-----

### ⚠️ Requirements

The backend must be running for the tests to function. You can start it with:

```bash
yarn workspace web dev
```

Also, ensure you have Chrome v136+ installed.



## 🏗️ Project Structure

```
treetracker-wallet-app/
├── apps/
│   ├── web/             # Next.js 14 web application
│   ├── native/          # React Native mobile app (Expo)
│   └── user/            # NestJS backend API service
├── packages/
│   ├── core/            # Shared business logic (jotai)
│   └── queue/           # Message queue utilities
```

## 🚀 Development Guide

Ready to contribute? Here's your path from setup to deployment:

1. **Fork the repository on GitHub**

### 1. Initial Setup

```bash
git clone https://github.com/YOUR_USERNAME/treetracker-wallet-app.git
cd treetracker-wallet-app
yarn install
```

### 2. Choose Your Development Path

#### 🌐 **Web Development**

Perfect for UI/UX improvements and frontend features

```bash
yarn web:dev
# → http://localhost:3000
```

#### 📱 **Mobile Development**

For cross-platform mobile features

```bash
yarn native:start
# → Scan QR code with Expo Go app
```

#### 🔧 **Backend Development**

For API development and database work

```bash
# Setup environment (first time only)
cp apps/user/.env.example apps/user/.dev.env
# → Edit .dev.env with your configuration

yarn user:dev
# → http://localhost:8080
```

### 3. Full Stack Development

Run all services for integrated development:

```bash
# Individual terminals
yarn web:dev     # Terminal 1
yarn user:dev    # Terminal 2
yarn native:start # Terminal 3
```

## 🧪 Testing & Quality

### Quick Testing

```bash
# E2E tests (best way to understand the project)
yarn cypress-e2e-test

# Headless testing
yarn cypress-e2e-headless-test

# Unit tests
yarn test

# Lint and format
yarn lint:fix
```

## 🤝 Contributing

We welcome contributions! Whether you're fixing bugs, adding features, or
improving documentation, your help makes Treetracker better.

**👉 [Read our full Contributing Guide →](./CONTRIBUTING.md)**

The contributing guide covers everything you need: setup, workflows, coding
standards, testing, and review processes.

## 🤝 Community & Support

### **Get Help**

- **Documentation:** Start with this README and
  [Contributing Guide](./CONTRIBUTING.md)
- **Issues:** Report bugs and request features on
  [GitHub Issues](https://github.com/Greenstand/treetracker-wallet-app/issues)
- **Slack:** Join our Slack community (Ask the maintainers for an invite)
- **Discussions:** Ask questions in Slack

<!-- trigger -->
