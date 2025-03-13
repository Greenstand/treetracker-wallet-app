/// <reference types="cypress" />
import React from "react";
import Welcome from "../../src/components/Welcome";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../src/theme";
import { CssBaseline } from "@mui/material";

describe("Welcome", () => {
  beforeEach(() => {
    cy.mount(
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Welcome onContinue={cy.stub().as("continueHandler")} />
      </ThemeProvider>,
    );
  });

  it("should display the correct heading", () => {
    cy.contains("Account created!").should("be.visible");
  });

  it("should display the welcome text", () => {
    cy.contains("Welcome and thank you for joining").should("be.visible");
    cy.contains("automatically receive your wallet").should("be.visible");
  });

  it("should have a continue button", () => {
    cy.contains("button", "Continue").should("be.visible");
  });

  it("should call onContinue when button is clicked", () => {
    cy.contains("button", "Continue").click();
    cy.get("@continueHandler").should("have.been.called");
  });

  it("should have the check circle icon", () => {
    cy.get("svg").should("be.visible");
  });
});
