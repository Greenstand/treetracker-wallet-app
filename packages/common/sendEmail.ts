export function sendEmail(
  to: string,
  subject: string,
  body: string,
  options: {
    // neccessary options for sending email, e.g., SMTP configuration
    smtpHost: string;
  },
): Promise<void> {}
