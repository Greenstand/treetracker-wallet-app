import React from "react";
import { RecentActivity } from "../../src/components/RecentActivity";

const activityData = [
  { title: "Restaurant XY", amount: 100, status: "Received" },
];

describe("RecentActivity Component", () => {
  it("displays title and activity items", () => {
    cy.mount(<RecentActivity activityData={activityData} />);
    cy.contains("Recent Activity").should("exist");
    cy.contains("Restaurant XY").should("exist");
  });

  it("has a clickable View All button", () => {
    cy.mount(<RecentActivity activityData={activityData} />);
    cy.contains("View all").should("exist").click();
  });
});
