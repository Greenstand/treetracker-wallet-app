import React from "react";
import { NotificationsList } from "../../src/components/NotificationsList";

const mockNotifications = [
  {
    title: "Test Notification 1",
    description: "Description 1",
    time: "1h",
    thirdParty: "ABC",
  },
  {
    title: "Test Notification 2",
    description: "Description 2",
    time: "5h",
    thirdParty: "XYZ",
  },
];

describe("NotificationsList Component", () => {
  it("renders the list of notifications", () => {
    cy.mount(<NotificationsList notifications={mockNotifications} />);
    cy.contains("Test Notification 1").should("exist");
    cy.contains("Test Notification 2").should("exist");
  });

  it("renders notification descriptions correctly", () => {
    cy.mount(<NotificationsList notifications={mockNotifications} />);
    cy.contains("Description 1").should("exist");
    cy.contains("Description 2").should("exist");
  });

  it("renders timestamps for notifications", () => {
    cy.mount(<NotificationsList notifications={mockNotifications} />);
    cy.contains("1h").should("exist");
    cy.contains("5h").should("exist");
  });
});
