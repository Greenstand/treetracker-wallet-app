/* E2E test for packages/common/sendEmail.ts using MailHog.
   Start MailHog locally before running:
     docker run -d --name mailhog -p 1025:1025 -p 8025:8025 mailhog/mailhog
*/

/** Use Jest’s types for describe/it/expect (avoid Cypress/Mocha) */
import { describe, it, expect, beforeAll, afterAll } from "@jest/globals";
import { setTimeout as delay } from "timers/promises";
import { sendEmail } from "../../sendEmail";

const MAILHOG_API = process.env.MAILHOG_API ?? "http://127.0.0.1:8025";

// Helper to clear messages before and after tests
async function purgeMailhog() {
  await fetch(`${MAILHOG_API}/api/v1/messages`, { method: "DELETE" });
}

describe("sendEmail E2E (MailHog)", () => {
  const to = "test-recipient@example.com";
  const uniq = Date.now();
  const subject = `WalletApp E2E ${uniq}`;
  const html = `<p>Hello from E2E ${uniq}</p>`;

  beforeAll(purgeMailhog);
  afterAll(purgeMailhog);

  it("delivers an email end-to-end to MailHog", async () => {
    // 1️⃣ Call the actual sendEmail function
    await sendEmail(to, subject, html, {
      smtpHost: process.env.SMTP_HOST ?? "127.0.0.1",
      smtpPort: Number(process.env.SMTP_PORT ?? 1025),
      secure: false,
      from: "no-reply@example.com",
    });

    // 2️⃣ Poll MailHog for the message (SMTP delivery is async)
    const timeoutMs = 12000;
    const start = Date.now();

    let found = false;
    let lastDump: any = null;

    while (!found && Date.now() - start < timeoutMs) {
      const res = await fetch(`${MAILHOG_API}/api/v2/messages`);
      if (!res.ok)
        throw new Error(`MailHog API error: ${res.status} ${res.statusText}`);
      const data = await res.json();
      lastDump = data;

      const match = data.items?.find((m: any) => {
        const h = m?.Content?.Headers ?? {};
        const subj = h?.Subject?.[0] ?? "";
        const toHeader = h?.To?.[0] ?? "";
        return subj.includes(subject) && toHeader.includes(to);
      });

      if (match) {
        const h = match.Content?.Headers ?? {};
        const body = match.Content?.Body ?? "";
        expect(h.Subject?.[0]).toContain(subject);
        expect(h.To?.[0]).toContain(to);
        expect(body).toContain(`Hello from E2E ${uniq}`);
        found = true;
      } else {
        await delay(400);
      }
    }

    if (!found) {
      // For debugging CI runs
      // eslint-disable-next-line no-console
      console.error("MailHog dump:", JSON.stringify(lastDump, null, 2));
      throw new Error("E2E email not found in MailHog within timeout");
    }
  }, 20000); // test timeout (ms)
});
