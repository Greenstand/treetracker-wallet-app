// Define the structure of user data
export interface User {
  username: string;
  firstName?: string; // Optional for login
  lastName?: string; // Optional for login
  email?: string; // Optional for login
  password: string;
  confirmPassword?: string; // Optional for register
  isSubmitting?: boolean;
  submissionSuccess?: boolean;
  error: string | null;
  fieldErrors: { [key: string]: string };
}

// Define the type for form type, which could either be 'register' or 'login'
export type UserType = "register" | "login";
