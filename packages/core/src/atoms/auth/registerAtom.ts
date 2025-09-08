import { atom } from "jotai";
import { registerSchema } from "../../schemas";
import { User } from "../../types/auth";
import { WALLET_APP_API } from "../../utils/config";
import { trimInputs, handleValidationError } from "../../utils/validation";
import { loadingAtom } from "./loadingAtom";

export const registerAtom = atom(null, async (_get, set, formValues: User) => {
  const trimmed = trimInputs(formValues);

  const { error: validationError, value } = registerSchema.validate(trimmed, {
    abortEarly: false,
  });

  if (validationError) {
    const fieldErrors = handleValidationError(validationError);
    return { error: "Validation failed", fieldErrors };
  }

  set(loadingAtom, true);

  try {
    const response = await fetch(`${WALLET_APP_API}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(value),
      credentials: "include",
    });

    const data = await response.json();

    if (response.ok) {
      return data;
    } else {
      return { error: data.message || "Registration failed" };
    }
  } catch (err) {
    return {
      error: err instanceof Error ? err.message : "Unexpected error",
    };
  } finally {
    set(loadingAtom, false);
  }
});
