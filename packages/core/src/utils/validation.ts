import { AuthData } from "../types/auth";

// Trims any string fields in the AuthData object and leaves other fields intact
export const trimInputs = (input: Partial<AuthData>): AuthData => {
  return Object.keys(input).reduce((acc, key) => {
    const value = input[key as keyof AuthData];
    // Only trim strings, leave other types intact
    acc[key] = typeof value === "string" ? value.trim() : value;
    return acc;
  }, {} as AuthData);
};

// Handles validation errors and formats them into a key-value object
export const handleValidationError = (
  error: any,
): { [key: string]: string } => {
  return error.details.reduce(
    (acc, curr) => {
      if (curr.context?.key) {
        acc[curr.context.key] = curr.message;
      }
      return acc;
    },
    {} as { [key: string]: string },
  );
};
