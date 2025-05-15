import { AuthUser } from "../types/auth";

// Trims any string fields in the AuthUser object and leaves other fields intact
export const trimInputs = (input: Partial<AuthUser>): AuthUser => {
  const result = {} as Record<keyof AuthUser, AuthUser[keyof AuthUser]>;

  for (const key of Object.keys(input) as (keyof AuthUser)[]) {
    const value = input[key];
    result[key] = typeof value === "string" ? value.trim() : value!;
  }

  return result as AuthUser;
};

// Handles validation errors and formats them into a key-value object
export const handleValidationError = (
  error: any,
): { [key: string]: string } => {
  return error.details.reduce(
    (
      acc: { [key: string]: string },
      curr: { context?: { key?: string }; message: string },
    ) => {
      if (curr.context?.key) {
        acc[curr.context.key] = curr.message;
      }
      return acc;
    },
    {} as { [key: string]: string },
  );
};
