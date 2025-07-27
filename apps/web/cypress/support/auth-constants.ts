// 🚀 Shared Auth Constants & Helpers for 10x Development with Fixtures

import sinonChai from "cypress/types/sinon-chai";

// Static Selectors (don't change often, keep in constants)
export const SELECTORS = {
  // Login selectors
  loginUsername: "login-username",
  loginPassword: "login-password",
  loginSubmitButton: "login-submit-button",
  loginError: "login-error",
  passwordToggle: "toggle-password-visibility",
  loginLink: "login-link",

  // Registration selectors
  signupForm: "signup-form",
  signupEmail: "signup-email",
  signupUsername: "signup-username",
  signupPassword: "signup-password",
  signupConfirmPassword: "signup-confirm-password",
  signupSubmitButton: "signup-submit-button",
  signupLink: "signup-link",
  signupError: "signup-error",
  signupSuccess: "signup-success",

  // Shared selectors
  errorHelperText: "error-helper-text",
  homePageElement: "home-page-element",
} as const;

// 🔧 Auth Helper Functions with Fixture Support

// Login helpers
export const loginWith = (credentials: {
  username: string;
  password: string;
}) => {
  cy.getByData(SELECTORS.loginUsername).type(credentials.username);
  cy.getByData(SELECTORS.loginPassword).type(credentials.password);
  cy.getByData(SELECTORS.loginSubmitButton).click();
};

export const expectLoginError = (message: string) => {
  cy.getByData(SELECTORS.loginError)
    .should("be.visible")
    .and("contain", message);
};

export const expectSuccessfulLogin = (homeRoute: string = "/home") => {
  cy.window()
    .its("sessionStorage.token")
    .should("be.a", "string")
    .and("not.be.empty");
  cy.location("pathname", { timeout: 20000 }).should("eq", homeRoute);
  cy.getByData(SELECTORS.homePageElement).should("be.visible");
};

// Registration helpers
export const registerWith = (data: {
  email?: string;
  username?: string;
  password: string;
  confirmPassword?: string;
}) => {
  if (typeof data.email === "string") {
    cy.getByData(SELECTORS.signupEmail).type(data.email);
  }
  if (typeof data.username === "string") {
    cy.getByData(SELECTORS.signupUsername).type(data.username);
  }
  cy.getByData(SELECTORS.signupPassword).type(data.password);
  if (typeof data.confirmPassword === "string") {
    cy.getByData(SELECTORS.signupConfirmPassword).type(data.confirmPassword);
  }
  cy.getByData(SELECTORS.signupSubmitButton).click();
};

export const expectRegistrationSuccess = (
  message: string = "User created successfully!",
) => {
  cy.getByData(SELECTORS.signupSuccess)
    .should("be.visible")
    .and("contain", message);
};

// Shared validation helpers
export const expectValidationError = (selector: string, message: string) => {
  cy.getByData(selector).should("be.visible").and("contain", message);
};

export const expectFormFieldError = (message: string) => {
  cy.getByData(SELECTORS.errorHelperText)
    .should("be.visible")
    .and("contain", message);
};

// Utility functions
export const generateUniqueEmail = () => `testuser${Date.now()}@example.com`;

export const clearAuthSession = () => {
  cy.window().then(win => {
    win.sessionStorage.clear();
    win.localStorage.clear();
  });
};

// 🎯 Fixture Helper Functions for 10x Development
export const loadAuthFixture = () => {
  return cy.fixture("auth-data").as("authData");
};

export const getFixtureData = (path: string) => {
  return cy.get("@authData").then((data: any) => {
    return path.split(".").reduce((obj, key) => obj[key], data);
  });
};
