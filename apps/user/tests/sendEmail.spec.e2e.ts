import { sendEmail } from "../../../packages/common/sendEmail";

async function getMailhogMessages() {
  const res = await fetch("http://localhost:8025/api/v2/messages");
  if (!res.ok) throw new Error(`MailHog API failed: ${res.status}`);
  return res.json() as Promise<any>;
}

async function waitForEmail(subject: string, timeoutMs = 8000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    const data = await getMailhogMessages();
    const items = data?.items ?? [];
    const found = items.find(
      (m: any) => m?.Content?.Headers?.Subject?.[0] === subject,
    );
    if (found) return found;
    await new Promise((r) => setTimeout(r, 300));
  }
  throw new Error(`Timed out waiting for email with subject: ${subject}`);
}

describe("sendEmail (MailHog E2E)", () => {
  it("sends an email that appears in MailHog", async () => {
    const subject = `E2E MailHog ${Date.now()}`;
    const body = "Hello MailHog!\nThis is an automated test.";

    await sendEmail("testuser123@example.com", subject, body, {
      smtpHost: "localhost",
      smtpPort: 1025,
      from: "dev@localhost",
      secure: false,
    });

    const msg = await waitForEmail(subject);

    expect(msg.Content.Headers.To[0]).toContain("testuser123@example.com");
    expect(msg.Content.Headers.Subject[0]).toBe(subject);
    expect(msg.Content.Body).toContain("Hello MailHog!");
  });
});
