import React from "react";
import { TokenBalance } from "../../src/components/TokenBalance";

describe("TokenBalance Component", () => {
  it("displays correct token count", () => {
    cy.mount(<TokenBalance tokenCount={1000} />);
    cy.contains("Tokens").should("exist");
    cy.contains("1000").should("exist");
  });
});
