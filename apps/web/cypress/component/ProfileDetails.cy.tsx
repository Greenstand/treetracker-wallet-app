import React from "react";
import ProfileDetails from "../../src/components/ProfileDetails";

describe("ProfileDetails Component", () => {
  it("displays user name and email", () => {
    cy.mount(<ProfileDetails name="John Doe" email="Emailaddress@gmail.com" />);
    cy.contains("John Doe").should("exist");
    cy.contains("Emailaddress@gmail.com").should("exist");
  });

  it("renders the edit profile button", () => {
    cy.mount(<ProfileDetails name="John Doe" email="Emailaddress@gmail.com" />);
    cy.contains("Edit Profile").should("exist").click();
  });
});
