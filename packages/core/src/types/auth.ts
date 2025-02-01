export interface AuthData {
  username: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  password: string;
  confirmPassword?: string;
  isSubmitting?: boolean;
  submissionSuccess?: boolean;
  error: string | null;
  fieldErrors: { [key: string]: string };
}

// Define the type for form type, which could either be 'register' or 'login'
export type FormType = "register" | "login";
