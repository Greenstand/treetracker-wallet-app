import React from "react";
import { ActivityItem } from "../../src/components/ActivityItem";

describe("ActivityItem Component", () => {
  it("displays restaurant name and amount correctly", () => {
    cy.mount(
      <ActivityItem title="Restaurant XY" amount={100} status="Received" />,
    );
    cy.contains("Restaurant XY").should("exist");
    cy.contains("+100").should("exist");
  });

  it("shows status correctly", () => {
    cy.mount(<ActivityItem title="Greenstand" amount={-200} status="Sent" />);
    cy.contains("Sent").should("exist");
    cy.contains("-200").should("exist");
  });

  it("hides the amount when the transfer did not complete", () => {
    cy.mount(
      <ActivityItem
        title="Sent to wallet"
        amount={-1}
        status="Cancelled"
        showAmount={false}
      />,
    );
    cy.contains("Cancelled").should("exist");
    cy.contains("-1").should("not.exist");
  });
});
