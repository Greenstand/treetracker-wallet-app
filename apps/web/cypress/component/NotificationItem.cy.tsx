import React from "react";
// import { NotificationItem } from "../../src/app/notifications/NotificationItem";
import { NotificationItem } from "../../src/components/NotificationItem";
const mockNotification = {
  title: "Sample Notification",
  description: "Sample Description",
  time: "2h",
  thirdParty: "Sample Source",
};

describe("NotificationItem Component", () => {
  it("renders the notification title", () => {
    cy.mount(
      <NotificationItem
        {...mockNotification}
        isSelected={false}
        onSelect={() => {}}
      />,
    );
    cy.contains("Sample Notification").should("exist");
  });

  it("renders the notification description", () => {
    cy.mount(
      <NotificationItem
        {...mockNotification}
        isSelected={false}
        onSelect={() => {}}
      />,
    );
    cy.contains("Sample Description").should("exist");
  });

  it("renders the time", () => {
    cy.mount(
      <NotificationItem
        {...mockNotification}
        isSelected={false}
        onSelect={() => {}}
      />,
    );
    cy.contains("2h").should("exist");
  });
});
