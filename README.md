# Treetracker Impact Wallet

## Development Environment Quick Start

1. Make sure all npm modules are installed for client.

```
npm i
```

2. Start the client

```
npm start
```

3. Open the web map in the browser with URL: http://localhost:3000

### Cypress

We use Cypress to build the sandbox for component building and mock the server-side API in the integration tests, here are some guide for this:

To run Cypress integration e2e test:

```
npm run cy
```

To run Cypress unit tests:

```
npm run cyu
```

To simulate mobile device in the component tool:

Because that we focus on the mobile device, so when we build component by Cypress component tool, we want to operate the component in simulator of mobile device, with the devtools in Chrome, the most important feature is the swipe/touch simulator (you can see it when you open Chrome devtools and switch to any mobile device), but it becomes tricky if you are using the Cypress component took, cuz we have to use big screen to show them all, how can we open a big screen and simulate the mobile behavior at the same time, this video is a tutorial showing how to set it up:

[Video for Cypress setting up](https://www.loom.com/share/a126f0a80c3a4352a3ddf955f88228b9)

&nbsp;
&nbsp;

### How to test

We use Jest to build tests.

1. To test client

```
npm test
```

## Code style guide

We follow the Airbnb JavaScript style guide. The superficial aspects of this style are enforced by a pre-commit hook in the project that runs [Prettier](https://prettier.io/) when you commit a change.

If you are using VSCode as your IDE, please follow [this guide](https://www.digitalocean.com/community/tutorials/how-to-format-code-with-prettier-in-visual-studio-code) to set up Prettier and automatically format your code on file save.

### Rules

In .eslintrc.json, there is a set of rules with status **off or warn**. Whenever you are developing a new file or an existing file try to correct some warnings, because in the future the rules will be activated.

**For more information about rules:** https://eslint.org/docs/2.0.0/rules/

**Airbnb Style Guide:** https://airbnb.io/javascript/

<sub><sup>**Indention:** 2 Spaces for indentation</sup></sub>
<sub><sup>**Semicolon:** Use semicolons at the end of each line</sup></sub>
<sub><sup>**Characters:** 80 characters per line</sup></sub>
<sub><sup>**Equal Equal (eqeqeq):** Good practice to use the type-safe equality operators === and !== instead of their regular counterparts == and !=</sup></sub>
<sub><sup>**Quotes:** Use single quotes unless you are writing JSON</sup></sub>

```js
const foo = 'bar';
```

<sub><sup>**Braces:** Opening braces go on the same line as the statement</sup></sub>

```js
if (true) {
  console.log('here');
}
```

<sup><sub>**Variable declaration:** Declare one Variable per statement</sup></sub>

```js
const dog = ['bark', 'woof'];
let cat = ['meow', 'sleep'];
```

<sup><sub>**Variable, properties and function names:** Use lowerCamelCase for variables, properties and function names</sup></sub>

```js
const adminUser = db.query('SELECT * From users ...');
```

<sup><sub>**Class names:** Use UpperCamelCase for class names</sup></sub>

```js
class Dog {
  bark() {
    console.log('woof');
  }
}
```

<sup><sub>**Descriptive conditions:** Make sure to have a descriptive name that tells the use and meaning of the code</sup></sub>

```js
const isValidPassword =
  password.length >= 4 && /^(?=.*\d).{4,}$/.test(password);
```

<sup><sub>**Object/Array creation:** Use trailing commas and put short declarations on a single line. Only quote keys when your interpreter complains:</sup></sub>

```js
var a = ['hello', 'world'];
var b = {
  good: 'code',
  'is generally': 'pretty',
};
```

### How to test the rules

In package.json, there is a topic called **scripts** that contains many scripts to be executed.
To validate the rules manually, you must run and check that there is no error in your development:

```
npm run eslint
```

You will be able to run through this shortcut in VSCode
![IDE VSCode](./public/images/VSCode_NPM_Script.png)

To fix automatic rules

```
lint:fix
```
