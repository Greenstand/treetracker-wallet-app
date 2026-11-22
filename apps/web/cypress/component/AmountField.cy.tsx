import React from "react";
import {
  AmountField,
  sanitizeTokenAmount,
} from "../../src/components/AmountField";

// The Send page keeps the amount in state and feeds it back into the field,
// so the harness mirrors that controlled contract.
function AmountFieldHarness({ initial = "1" }: { initial?: string }) {
  const [value, setValue] = React.useState(initial);
  return <AmountField value={value} onChange={setValue} />;
}

const amountInput = () => cy.get('[data-test="send-amount"] input');

describe("AmountField Component (Send screen token amount)", () => {
  it("accepts plain positive integers", () => {
    cy.mount(<AmountFieldHarness initial="" />);
    amountInput().type("42");
    amountInput().should("have.value", "42");
  });

  it("rejects exponential notation characters (e / E)", () => {
    cy.mount(<AmountFieldHarness />);
    amountInput().clear().type("2e3");
    // Without the fix, "2e3" is accepted and evaluates as 2 * 10^3 = 2000.
    amountInput().should("have.value", "23");
    amountInput().clear().type("5E2");
    amountInput().should("have.value", "52");
  });

  it("rejects sign and decimal point characters (+ / - / .)", () => {
    cy.mount(<AmountFieldHarness />);
    amountInput().clear().type("1.5");
    amountInput().should("have.value", "15");
    amountInput().clear().type("-3");
    amountInput().should("have.value", "3");
    amountInput().clear().type("+7");
    amountInput().should("have.value", "7");
  });

  it("calls preventDefault for each blocked keydown", () => {
    cy.mount(<AmountFieldHarness />);
    ["e", "E", "+", "-", "."].forEach((key) => {
      amountInput().then(($input) => {
        const event = new KeyboardEvent("keydown", {
          key,
          cancelable: true,
          bubbles: true,
        });
        $input[0].dispatchEvent(event);
        expect(event.defaultPrevented, `"${key}" keydown`).to.equal(true);
      });
    });
  });
});

describe("sanitizeTokenAmount (paste / autofill guard)", () => {
  it("strips scientific notation and other non-digit characters", () => {
    expect(sanitizeTokenAmount("2e3")).to.equal("23");
    expect(sanitizeTokenAmount("1E9")).to.equal("19");
    expect(sanitizeTokenAmount("1.5")).to.equal("15");
    expect(sanitizeTokenAmount("-4")).to.equal("4");
    expect(sanitizeTokenAmount("+7")).to.equal("7");
    expect(sanitizeTokenAmount("1_000")).to.equal("1000");
  });

  it("keeps digit-only values unchanged", () => {
    expect(sanitizeTokenAmount("")).to.equal("");
    expect(sanitizeTokenAmount("12")).to.equal("12");
    expect(sanitizeTokenAmount("1000000")).to.equal("1000000");
  });
});