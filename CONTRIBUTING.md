# 🤝 Contributing to Treetracker Wallet App

Thank you for your interest in contributing to the Treetracker Wallet App! This
document provides guidelines and instructions for contributing to our monorepo
project.

## 📋 Table of Contents

- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Project Structure](#project-structure)
- [Coding Standards](#coding-standards)
- [Testing Guidelines](#testing-guidelines)
- [Commit Message Guidelines](#commit-message-guidelines)
- [Pull Request Process](#pull-request-process)
- [Issue Guidelines](#issue-guidelines)
- [Development Environment](#development-environment)

 <h2 id="getting-started"> 🚀Getting Started</h2>

### Prerequisites

- **Node.js** (v20 or higher)
- **Yarn** (v1.22 or higher)
- **Git**
- **Docker** (for backend development)

### Setting Up Your Development Environment

1. **Fork the repository** on GitHub
2. **Clone your fork locally:**

   ```bash
   git clone https://github.com/YOUR_USERNAME/treetracker-wallet-app.git
   cd treetracker-wallet-app
   ```

3. **Add the original repository as upstream:**

   ```bash
   git remote add upstream https://github.com/Greenstand/treetracker-wallet-app.git
   ```

4. **Install dependencies:**

   ```bash
   yarn install
   ```

5. **Create a new branch for your feature:**
   ```bash
   git checkout -b feature/your-feature-name
   ```

 <h2 id="development-workflow">🔄 Development Workflow</h2>

### Before Starting Work

1. **Check existing issues** to avoid duplicate work
2. **Create or comment on an issue** describing what you plan to work on
3. **Wait for maintainer approval** for significant changes
4. **Sync with upstream** to ensure you have the latest changes:
   ```bash
   git fetch upstream
   git checkout main
   git merge upstream/main
   ```

### Development Process

1. **Make your changes** following our coding standards
2. **Write or update tests** for your changes
3. **Run quality checks**
4. **Commit your changes** using conventional commits
5. **Push to your fork** and create a pull request

<h1 id="project-structure">🏗️ Project Structure</h2>

Our monorepo structure allows you to contribute to different parts of the
application:

```
treetracker-wallet-app/
├── apps/
│   ├── web/             # Next.js 14 web application
│   ├── native/          # React Native mobile app (Expo)
│   └── user/            # NestJS backend API service
├── packages/
    ├── core/            # Shared business logic & types
    └── queue/           # Message queue utilities

```

### Working on Specific Apps

#### Web Application (`apps/web`)

- **Technology:** Next.js 14+, TypeScript, Material-UI
- **Development:** `yarn web:dev`
- **Testing:** `yarn cypress-e2e-test`, `yarn cypress-component-test`

#### Mobile Application (`apps/native`)

- **Technology:** React Native, Expo, TypeScript
- **Development:** `yarn native:start`
- **Testing:** `yarn test` (in the native directory)

#### Backend API (`apps/user`)

- **Technology:** NestJS, TypeScript, PostgreSQL, Prisma
- **Development:** `yarn user:dev`
- **Testing:** Unit, Integration, and E2E tests available

##### Backend Setup

1. **Configure environment variables:**

   ```bash
   # Set up config at: apps/user/.dev.env
   PRIVATE_KEYCLOAK_CLIENT_SECRET = [ask maintainer about this]
   ```

2. **Handle database connection issues:** If you encounter DB connection
   failures for queue reading, you can disable the queue module:

   In `apps/user/src/app.module.ts`:

   ```typescript
   @Module({
     imports: [
       UserModule,
       HttpModule,
       //QueueModule, // comment out this line
       ConfigModule.forRoot({
         envFilePath: ENV === "dev" ? ".dev.env" : ".env",
       }),
       AuthModule,
     ],
     controllers: [UserController],
     providers: [UserService, AuthService],
   })
   export class AppModule {}
   ```

#### Shared Packages (`packages/`)

- **core:** Shared State, schemas, and business logic (Jotai)
- **queue:** Message queue utilities

<h2 id="coding-standards">🎨 Coding Standards</h2>

### TypeScript

- **Strict mode enabled** - All code must pass TypeScript strict checks
- **Use proper types** - Avoid `any`, prefer specific interfaces
- **Export types** from shared packages when needed

### Code Style

We use ESLint and Prettier for consistent code formatting:

```bash
# Check code style
yarn lint:check

# Fix code style issues
yarn lint:fix

# Format code
yarn prettier

# Check formatting
yarn prettier:check
```

### File and Folder Naming

- **Components:** PascalCase (`WalletDetailModal.tsx`)
- **Utilities:** camelCase (`formatCurrency.ts`)
- **Pages:** lowercase with hyphens (`wallet-details/page.tsx`)
- **Folders:** lowercase with hyphens (`wallet-management/`)

### Component Guidelines

#### React Components

```typescript
// ✅ Good: Functional component with proper types
interface WalletCardProps {
  walletName: string;
  balance: number;
  onSelect: (walletId: string) => void;
}

export default function WalletCard({
  walletName,
  balance,
  onSelect,
}: WalletCardProps) {
  // Component logic
}
```

 <h2 id="testing-guidelines">🧪 Testing Guidelines</h2>

### Testing Requirements

- **New features** must include tests
- **Bug fixes** should include regression tests
- **Aim for high coverage** but focus on critical paths

### Testing Types

#### Integration Tests

```bash
# Run integration tests for the backend
yarn user:test:int
```

#### E2E Tests

```bash
# Web E2E tests (Cypress)
yarn cypress-e2e-test

# Component tests (Cypress)
yarn cypress-component-test
```

### Writing Tests should be clear and descriptive. Use `describe` and `it` blocks effectively.

```typescript
// ✅ Good: Descriptive test with proper setup
describe('WalletDetailModal', () => {
  it('should display wallet name and balance correctly', () => {
    render(
      <WalletDetailModal
        walletName="Test Wallet"
        balance={100}
        onClose={mockOnClose}
      />
    );

    expect(screen.getByText('Test Wallet')).toBeInTheDocument();
    expect(screen.getByText('100')).toBeInTheDocument();
  });
});
```

### **Root Level Commands**

```bash
# Development
yarn web:dev              # Start web development
yarn native:start         # Start React Native with Expo
yarn user:dev             # Start NestJS backend API

# Testing
yarn user:test:unit       # Run unit tests for user service
yarn user:test:e2e       # Run E2E tests for user service

yarn cypress-e2e-test     # Interactive E2E tests
yarn cypress-e2e-headless-test # Headless E2E tests

# Code Quality
yarn lint:check           # Check code style
yarn lint:fix             # Fix code style issues
yarn prettier             # Format code

# Building
yarn web:build            # Build web application only
yarn user:build           # Build backend API only
```

<h2 id="commit-message-guidelines">📝 Commit Message Guidelines</h2>

We follow [Conventional Commits](https://www.conventionalcommits.org/)
specification:

### Format

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

### Types

- **feat:** A new feature
- **fix:** A bug fix
- **docs:** Documentation only changes
- **style:** Changes that do not affect code meaning (formatting, etc.)
- **refactor:** Code change that neither fixes a bug nor adds a feature
- **test:** Adding missing or correcting existing tests
- **chore:** Changes to build process or auxiliary tools

### Examples

```bash
feat(web): add wallet search functionality
fix(native): resolve token balance calculation error
docs: update installation instructions
style(web): format components according to prettier rules
refactor(user): restructure authentication middleware
test(core): add unit tests for transaction validation
chore: update dependencies to latest versions
```

### Scope Guidelines

- **web:** Changes to the Next.js web application
- **native:** Changes to the React Native mobile app
- **user:** Changes to the NestJS backend API
- **core:** Changes to shared packages
- **queue:** Changes to message queue utilities
- **docs:** Documentation changes

## <h2 id="pull-request-process"> 🔄 Pull Request Process</h2>

### Before Submitting

1. **Ensure your branch is up to date** with main
2. **Run all tests** and ensure they pass
3. **Run linting** and fix any issues
4. **Update documentation** if needed
5. **Add or update tests** for your changes

### PR Title and Description

- **Use conventional commit format** for PR titles
- **Provide clear description** of what the PR does
- **Reference related issues** using keywords (fixes #123, closes #456)
- **Include screenshots** for UI changes
- **List breaking changes** if any

### PR Template

```markdown
## Description

Brief description of the changes made.

## Type of Change

- [ ] Bug fix (non-breaking change which fixes an issue)
- [ ] New feature (non-breaking change which adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to
      not work as expected)
- [ ] Documentation update

## Testing

- [ ] Tests pass locally
- [ ] New tests added for new functionality
- [ ] Manual testing completed

## Screenshots (if applicable)

Add screenshots to help explain your changes.

## Checklist

- [ ] My code follows the style guidelines of this project
- [ ] I have performed a self-review of my own code
- [ ] I have commented my code, particularly in hard-to-understand areas
- [ ] I have made corresponding changes to the documentation
- [ ] My changes generate no new warnings
- [ ] I have added tests that prove my fix is effective or that my feature works
```

### Review Process

1. **Automated checks** must pass (CI/CD, tests, linting)
2. **Code review** by at least one maintainer
3. **Testing** by reviewers if needed
4. **Approval** and merge by maintainers

 <h2 id="issue-guidelines">🐛 Issue Guidelines</h2>

### Before Creating an Issue

1. **Search existing issues** to avoid duplicates
2. **Check if it's already fixed** in the latest version
3. **Try to reproduce** the issue consistently

### Issue Types

#### Bug Reports

Use our bug report template and include:

- **Steps to reproduce**
- **Expected behavior**
- **Actual behavior**
- **Environment details** (OS, browser, app version)
- **Screenshots or videos** if applicable

#### Feature Requests

Use our feature request template and include:

- **Clear description** of the feature
- **Use case** and why it's needed
- **Possible implementation** ideas
- **Alternatives considered**

#### Questions

For questions, consider:

- **GitHub Discussions** for general questions
- **Issues** for specific technical questions
- **Discord/Slack** for real-time community help

 <h2 id="development-environment"> 💻  Development Environment</h2>

### IDE Setup

#### VS Code (Recommended)

Install these extensions:

- **TypeScript and JavaScript**
- **ESLint**
- **Prettier**
- **Jest**
- **React Native Tools** (for mobile development)

## 🎯 Getting Help

- **Issues:** For bug reports and feature requests
- **Slack:** Join our Slack community (Ask maintainer for invite)

**Questions?** Feel free to reach out to our maintainers or community for help.
