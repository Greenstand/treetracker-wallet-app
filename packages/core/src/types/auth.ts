export interface User {
  username?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  password: string;
  isSubmitting?: boolean;
  submissionSuccess?: boolean;
  error?: string | null;
  fieldErrors?: Record<string, string>;
}
