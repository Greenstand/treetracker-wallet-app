/// <reference types="cypress" />

declare global {
  namespace Cypress {
    interface Chainable {
      login(username?: string, password?: string): Chainable<void>;
      logout(): Chainable<void>;
    }
  }
}

Cypress.Commands.add("login", () => {
  const user = Cypress.env("TEST_USER") || {
    username: "demo",
    password: "demodemon",
  };

  cy.request({
    method: "POST",
    url: `${Cypress.env("api_server")}/login`,
    body: { username: user.username, password: user.password },
  }).then(res => {
    cy.log(`Logging in as ${user.username}...`);
    expect(res.status).to.eq(200);
    const { access_token } = res.body;

    cy.window().then(win => {
      win.sessionStorage.setItem("token", JSON.stringify(access_token));
    });
  });
});

Cypress.Commands.add("logout", () => {
  cy.window().then(win => {
    win.sessionStorage.removeItem("token");
  });
});

export {};
