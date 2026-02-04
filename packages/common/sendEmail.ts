import nodemailer from "nodemailer";

export async function sendEmail(
  to: string,
  subject: string,
  body: string,
  options: {
    smtpHost: string;
    smtpPort?: number;
    from?: string;
    secure?: boolean;
    auth?: { user: string; pass: string };
  },
): Promise<void> {
  const {
    smtpHost,
    smtpPort = 1025,
    from = "no-reply@localhost",
    secure = false,
    auth,
  } = options;

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure,
    auth,
  });

  await transporter.sendMail({
    from,
    to,
    subject,
    text: body,
    html: body.replace(/\n/g, "<br/>"),
  });
}
