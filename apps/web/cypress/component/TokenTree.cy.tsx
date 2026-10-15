import React from "react";
import { TokenTree } from "../../src/components/TokenTree";

const IMAGE = "https://example.org/tree.jpg";

describe("TokenTree Component", () => {
  it("shows the photo and the species", () => {
    cy.mount(<TokenTree imageUrl={IMAGE} speciesName="Mangifera indica" />);
    cy.get("[data-test=token-tree-photo]").should("have.attr", "src", IMAGE);
    cy.get("[data-test=token-tree-species]").should(
      "contain.text",
      "Mangifera indica",
    );
  });

  it("shows a placeholder when the token has no photo", () => {
    cy.mount(<TokenTree />);
    cy.get("[data-test=token-tree-photo]").should("not.exist");
    cy.get("[data-test=token-tree-placeholder]").should(
      "contain.text",
      "No photo",
    );
  });

  it("says so when the tree could not be loaded", () => {
    cy.mount(<TokenTree hasError />);
    cy.get("[data-test=token-tree-placeholder]").should(
      "contain.text",
      "Could not load",
    );
  });
});
