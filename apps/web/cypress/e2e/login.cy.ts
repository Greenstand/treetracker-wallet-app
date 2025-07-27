import {
  SELECTORS,
  loginWith,
  expectLoginError,
  expectSuccessfulLogin,
  expectFormFieldError,
  loadAuthFixture,
} from "../support/auth-constants";

describe("Login Page", () => {
  // 📋 Load fixture data once before all tests
  before(() => {
    loadAuthFixture();
  });

  beforeEach(function () {
    cy.visit(this.authData.routes.login);
  });

  describe("✅ Successful Login Flow", () => {
    it("should authenticate and redirect to home with session persistence", function () {
      loginWith(this.authData.users.validUser);
      expectSuccessfulLogin(this.authData.routes.home);
    });

    it("should redirect to intended protected page after login", function () {
      cy.visit(this.authData.routes.home);
      cy.url().should("include", this.authData.routes.login);

      loginWith(this.authData.users.validUser);
      cy.location("pathname").should("eq", this.authData.routes.home);
    });
  });

  describe("❌ Authentication Failures", () => {
    it("should reject invalid credentials", function () {
      loginWith(this.authData.users.invalidUser);
      expectLoginError(this.authData.errorMessages.login.loginFailed);
    });

    it("should reject short username", function () {
      loginWith(this.authData.users.shortUsername);
      expectLoginError(this.authData.errorMessages.login.loginFailed);
    });
  });

  describe("📝 Form Validation", () => {
    it("should validate empty username", function () {
      cy.getByData(SELECTORS.loginPassword).type(
        this.authData.users.validUser.password,
      );
      cy.getByData(SELECTORS.loginSubmitButton).click();
      expectFormFieldError(this.authData.errorMessages.login.emptyUsername);
    });

    it("should validate empty password", function () {
      cy.getByData(SELECTORS.loginUsername).type(
        this.authData.users.validUser.username,
      );
      cy.getByData(SELECTORS.loginSubmitButton).click();
      expectFormFieldError(this.authData.errorMessages.login.emptyPassword);
    });

    it("should validate short password", function () {
      loginWith(this.authData.users.shortPassword);
      expectFormFieldError(this.authData.errorMessages.login.shortPassword);
    });

    it("should validate both empty fields simultaneously", function () {
      cy.getByData(SELECTORS.loginSubmitButton).click();
      expectFormFieldError(this.authData.errorMessages.login.emptyUsername);
      expectFormFieldError(this.authData.errorMessages.login.emptyPassword);
    });
  });

  describe("🔧 UI Functionality", () => {
    it("should toggle password visibility", function () {
      cy.getByData(SELECTORS.loginPassword).type(
        this.authData.users.validUser.password,
      );
      cy.getByData(SELECTORS.passwordToggle).click();
    });

    it("should navigate to signup page", function () {
      cy.getByData(SELECTORS.signupLink).click();
      cy.location("pathname").should("eq", this.authData.routes.signup);
    });
  });
});
