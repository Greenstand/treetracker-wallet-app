import { sendEmail } from "../../../packages/common/sendEmail";

const shouldRun = !process.env.CI;

(shouldRun ? describe : describe.skip)("sendEmail (MailHog E2E)", () => {
  it("sends an email", async () => {
    const subject = `E2E MailHog ${Date.now()}`;
    const body = "Hello MailHog!\nThis is an automated test.";

    await sendEmail("testuser123@example.com", subject, body, {
      smtpHost: "localhost",
      smtpPort: 1025,
      from: "dev@localhost",
      secure: false,
    });

    // If no error occurs, test passes
    expect(true).toBe(true);
  });
});

