import nodemailer from "nodemailer";

export async function sendEmail(
  to: string,
  subject: string,
  body: string,
): Promise<void> {
  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = Number(process.env.SMTP_PORT ?? 1025);
  const from = process.env.SMTP_FROM ?? "no-reply@localhost";
  const secure = process.env.SMTP_SECURE === "true";
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;

  if (!smtpHost) {
    throw new Error("Missing required env var: SMTP_HOST");
  }

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure,
    auth:
      smtpUser && smtpPass
        ? {
            user: smtpUser,
            pass: smtpPass,
          }
        : undefined,
  });

  await transporter.sendMail({
    from,
    to,
    subject,
    text: body,
    html: body.replace(/\n/g, "<br/>"),
  });
}