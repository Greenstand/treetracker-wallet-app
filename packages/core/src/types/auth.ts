export interface AuthUser {
  username: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  password: string;
  confirmPassword?: string;
  isSubmitting?: boolean;
  submissionSuccess?: boolean;
  error: string | null;
  fieldErrors?: Record<string, string>;
}
export type FormType = "register" | "login";
