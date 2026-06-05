import React from "react";
import ProfileAvatar from "../../src/components/ProfileAvatar";

describe("ProfileAvatar Component", () => {
  it("renders avatar with initials", () => {
    cy.mount(<ProfileAvatar name="John" profileImageUrl="" />);
    cy.get("svg").should("exist"); // Checks if an avatar is rendered
    cy.contains("J").should("exist");
  });

  it("handles different name formats correctly", () => {
    const testCases = [
      { input: "John Doe", expected: "JD" },
      { input: "Jane", expected: "J" },
      { input: "John Middle Doe", expected: "JD" },
    ];

    testCases.forEach(({ input, expected }) => {
      cy.mount(<ProfileAvatar name={input} profileImageUrl="" />);
      cy.get(".MuiAvatar-root").should("have.text", expected);
    });
  });

  it("renders avatar with image", () => {
    const dummyImagePath = "/assets/images/login.png";

    cy.mount(<ProfileAvatar name="John" profileImageUrl={dummyImagePath} />);
    cy.get("img")
      .should("exist")
      .and("have.attr", "src")
      .and("include", dummyImagePath);
  });
});
