import React from "react";
import Copyright from "./Copyright";

describe("Copyright Component", () => {
  it("renders correctly", () => {
    cy.mount(<Copyright />);

    cy.contains("Copyright ©").should("exist");

    cy.get("a").should("have.attr", "href", "https://mui.com/");

    cy.contains("Your Website").should("exist");

    const currentYear = new Date().getFullYear();
    cy.contains(currentYear.toString()).should("exist");
  });

  it("uses MUI components correctly", () => {
    cy.mount(<Copyright />);

    cy.get("p").should("have.class", "MuiTypography-body2");

    cy.get("a")
      .should("have.class", "MuiLink-root")
      .and("have.attr", "href", "https://mui.com/");
  });
});
