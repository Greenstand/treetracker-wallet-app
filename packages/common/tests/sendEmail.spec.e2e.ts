import { sendEmail } from "../sendEmail";

const shouldRun = !process.env.CI;

(shouldRun ? describe : describe.skip)("sendEmail (MailHog E2E)", () => {
  it("sends an email", async () => {
    const to = process.env.SMTP_TEST_TO;
    if (!to) {
      throw new Error("Missing required env var: SMTP_TEST_TO");
    }

    const subject = `E2E MailHog ${Date.now()}`;
    const body = "Hello MailHog!\nThis is an automated test.";

    await sendEmail(to, subject, body);

    expect(true).toBe(true);
  });
});