import {
  SELECTORS,
  registerWith,
  expectRegistrationSuccess,
  expectValidationError,
  generateUniqueEmail,
  loadAuthFixture,
} from "../support/auth-constants";

describe("Register Page", () => {
  before(() => {
    loadAuthFixture();
  });

  beforeEach(function () {
    cy.visit(this.authData.routes.signup);
  });

  describe("🎨 Form Display", () => {
    it("should display the registration form with all required fields", () => {
      cy.getByData(SELECTORS.signupForm).should("exist");
      cy.getByData(SELECTORS.signupUsername).should("exist");
      cy.getByData(SELECTORS.signupEmail).should("exist");
      cy.getByData(SELECTORS.signupPassword).should("exist");
      cy.getByData(SELECTORS.signupSubmitButton).should("exist");
    });
  });

  describe("✅ Successful Registration", () => {
    it("should register successfully with valid data", function () {
      cy.intercept("POST", "**/api/auth/register", {
        statusCode: 200,
        body: {
          message: this.authData.errorMessages.registration.registrationSuccess,
        },
      });

      const uniqueEmail = generateUniqueEmail();
      registerWith({
        username: `${this.authData.registration.validRegistration.username}${Date.now()}`,
        email: uniqueEmail,
        password: this.authData.registration.validRegistration.password,
      });
      expectRegistrationSuccess(
        this.authData.errorMessages.registration.registrationSuccess,
      );
    });
  });

  describe("❌ Failed Registration", () => {
    it("should show an error when trying to register with an existing user name", function () {
      const existingEmail = this.authData.registration.existingEmail.email;
      const existingUsername =
        this.authData.registration.existingEmail.username;
      const existingPassword =
        this.authData.registration.existingEmail.password;
      registerWith({
        username: existingUsername,
        email: existingEmail,
        password: existingPassword,
      });
      expectValidationError(
        SELECTORS.signupError,
        this.authData.errorMessages.registration.emailAlreadyExists,
      );
    });
  });

  describe("📝 Form Validation", () => {
    it("should validate empty fields", function () {
      cy.getByData(SELECTORS.signupSubmitButton).click();

      // Assert all required field errors in a single step for clarity and maintainability
      [
        {
          selector: SELECTORS.errorHelperText,
          message: this.authData.errorMessages.registration.usernameRequired,
        },
        {
          selector: SELECTORS.errorHelperText,
          message: this.authData.errorMessages.registration.emailRequired,
        },
        {
          selector: SELECTORS.errorHelperText,
          message: this.authData.errorMessages.registration.passwordRequired,
        },
      ].forEach(({ selector, message }) => {
        expectValidationError(selector, message);
      });
    });
  });

  describe("🔗 Navigation", () => {
    it("should navigate to login page", function () {
      cy.getByData(SELECTORS.loginLink).click();
      cy.location("pathname").should("eq", this.authData.routes.login);
    });
  });
});
