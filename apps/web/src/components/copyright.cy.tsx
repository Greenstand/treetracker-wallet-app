import React from "react";
import Copyright from "./Copyright";

describe("Copyright Component", () => {
  it("renders correctly", () => {
    cy.mount(<Copyright />);

    // Check for the text "Copyright ©"
    cy.contains("Copyright ©").should("exist");

    // Check for the link with the correct href
    cy.get("a").should("have.attr", "href", "https://mui.com/");

    // Check for the text "Your Website"
    cy.contains("Your Website").should("exist");

    // Check for the current year
    const currentYear = new Date().getFullYear();
    cy.contains(currentYear.toString()).should("exist");
  });

  it("uses MUI components correctly", () => {
    cy.mount(<Copyright />);

    // Check if Typography component is rendered
    cy.get("p").should("have.class", "MuiTypography-body2");

    // Check if MuiLink component is rendered with correct href
    cy.get("a")
      .should("have.class", "MuiLink-root")
      .and("have.attr", "href", "https://mui.com/");
  });
});
