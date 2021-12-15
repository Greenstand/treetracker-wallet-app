# Treetracker Impact Wallet

## Development Environment Quick Start

Important Note: You need to use node version 16+ to run this project. You can download node 16 from the [official website](https://nodejs.org/en/).

1. Make sure all npm modules are installed for client.

```
npm i
```

2. Start the client

```
npm start
```

3. ~~Start the mock API~~

```
npm run mock-server
```

4. Start the mock API (new)
   Because we are now migrate the API to combine with `web map client` so please run the mock server in that repo:
   1. Clone the repo: `git clone git@github.com:Greenstand/treetracker-web-map-client.git`
   2. Install the modules: `npm ci`
   3. Run the mock server: `npm run mock-server`
5. Open the web map in the browser with URL: http://localhost:3000

## Workflow with Github

Our development workflow on Github, go [here](https://github.com/Greenstand/treetracker-web-map-client#workflow-with-github).

## Guide for development

### How to Build Components

We recommend using Cypress's component tool to build components separately:

To run Cypress unit/component tests:

```
npm run cyu
```

[Video tutorial for building component](https://loom.com/share/c750be68ecec4a9b99cb6921d2d2e041)

To simulate mobile device in the component tool:

As we are focusing on the mobile device, we using the Cypress tool to build our components. We want to test the them with devtools in Chrome, the most important feature being the swipe/touch simulator, which can be enabled by changing to mobile view within devtools. This can be tricky if you are using the Cypress component tool because the view portal can be too small to work with, so we created a customized device to enable better visibility. Here is a tutoroial showing how to set it up:

[Video tutorial for Cypress setting up](https://www.loom.com/share/a126f0a80c3a4352a3ddf955f88228b9)

### How to Build Pages/Routes

Glossary:

- Page/Route: every unique path of url on the app is a page or route, like a single tree page: `http://map.treetracker/trees/123`.

#### We need to build integration test for every page

We need to build Cypress integration test for every page/route, the integration tests would be run in CI when merge code and deploy to protect app from breaking.

Also, integration tests bring some benefits for the development workflow, by mocking API requests, we can separately develop every single page, if you'd like to practice Test Driven Develop, you can mock the API and write the tests first, then implement the real page later.

#### To run Cypress integration test

```
npm run cy
```

### How to mock the API

[Video tutorial for mock the API](https://www.loom.com/share/48554f0f67314ea78925a627b2142e1b)

## The API

Now we are going to combine the API of wallet API with the web map client API, so we deprecated the API and mock server under `doc` folder. Instead, you need to run the mock server from `treetracker-web-map-client` repo. Please download that repo and run the mock server: `npm run mock-server`.

The details is here: https://github.com/Greenstand/treetracker-web-map-client#the-api

### Config

The config to set the API server is an env variable:

```
REACT_APP_API_WALLET=https://4861b9cd-4ac3-460e-b42f-9b14ac00c403.mock.pstmn.io/
```

### Test

About our test philosophy and rules, please go [here](https://github.com/Greenstand/treetracker-web-map-client#test).

## Desgin resource

Our Figma UI design for the wallet app is here: https://www.figma.com/file/vOCKDnXrejCASuQQyZPYYR/Wallet-Web-App---Master?node-id=7%3A71

## Code style guide

We use [Prettier](https://prettier.io/), [Eslint](https://eslint.org/) along with [husky](https://typicode.github.io/husky/#/) to style our code.

### Prettier

Prettier reformats the code, but does not do code rule checking. If you are using VSCode as your IDE, please follow [this guide](https://www.digitalocean.com/community/tutorials/how-to-format-code-with-prettier-in-visual-studio-code) to set up Prettier and automatically format your code on file save.

You can find the Prettier rules in the .prettierrc file.

### Eslint

To check the coding rules we use Eslint. To validate the rules manually, you must run:

```
npm run lint
```

To fix automatic rules run:

```
npm run lint:fix
```

In .eslintrc.js, there is a set of rules with status **off or warn**. Whenever you are developing a new file or an existing file try to correct some warnings, because in the future the rules will be activated.

Once the rules are activated, you can't make a commit until you fix the lint errors!

You can find the Eslint rules in the .eslintrc.js file.

### husky

With husky we can use any git hook. Git Hooks are actions that can be executed if a certain Git event occurs. For example when a developer makes a 'git commit' or a 'git push'.
To add a command to a pre-commit hook or create a new one, use:

```
npx husky add .husky/pre-commit "<your command>"
```

.husky folder contains all our hooks. E.g.:

```
npx pretty-quick --staged
```

The [pretty-quick](https://www.npmjs.com/package/pretty-quick) npm package runs Prettier on your changed files.

### Commit Message and PR Title Format

We use [commitlint](https://github.com/conventional-changelog/commitlint), to format out commit messages. Commitlint checks if your commit messages meet the conventional commit format.

You need to use a proper commit message format or you will not be able to commit your changes! husky checks your commit messages before every commit.

Your commit messages will need to follow the [Conventional Commits](https://www.conventionalcommits.org/) format, for example:

```
feat: add new button
```

```
chore: run tests on travis ci
```

```
fix(server): send cors headers
```

### Other resource from Greenstand

We have more tech guides and handbook here:

[Greenstand engineer handbook](https://greenstand.gitbook.io/engineering/)

