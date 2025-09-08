import { User } from "../types/auth";

// Trims any string fields in the AuthUser object and leaves other fields intact
export const trimInputs = (input: Partial<User>): User => {
  const trimmed = {} as Record<keyof User, User[keyof User]>;

  (Object.keys(input) as (keyof User)[]).forEach((key) => {
    const value = input[key];
    trimmed[key] = typeof value === "string" ? value.trim() : value!;
  });

  return trimmed as User;
};

// Handles validation errors and formats them into a key-value object
export const handleValidationError = (
  error: any,
): { [key: string]: string } => {
  return error.details.reduce(
    (acc: { [key: string]: string }, curr: any) => {
      if (curr.context?.key) {
        acc[curr.context.key] = curr.message;
      }
      return acc;
    },
    {},
  );
};
