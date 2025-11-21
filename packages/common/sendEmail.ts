import * as nodemailer from "nodemailer";

/**
 * Sends an email using the provided SMTP configuration.
 * Works with local MailHog (for testing) or a real SMTP server.
 */
export async function sendEmail(
  to: string,
  subject: string,
  body: string,
  options: {
    smtpHost: string;
    smtpPort?: number;
    secure?: boolean;
    auth?: {
      user: string;
      pass: string;
    };
    from?: string;
  },
): Promise<void> {
  // Create the transporter based on given options
  const transporter = nodemailer.createTransport({
    host: options.smtpHost,
    port: options.smtpPort ?? 587,
    secure: options.secure ?? false,
    auth: options.auth,
  });

  // Send the email
  await transporter.sendMail({
    from: options.from ?? "no-reply@treetracker.org",
    to,
    subject,
    html: body,
  });
}
