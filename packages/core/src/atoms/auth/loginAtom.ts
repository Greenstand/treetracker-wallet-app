import { atom } from "jotai";
import { loginSchema } from "../../schemas";
import { User } from "../../types/auth";
import { WALLET_APP_API } from "../../utils/config";
import { trimInputs, handleValidationError } from "../../utils/validation";
import { loadingAtom } from "./loadingAtom";

export const loginAtom = atom(null, async (get, set, formValues: User) => {
  const trimmed = trimInputs(formValues);
  const { error: validationError, value } = loginSchema.validate(trimmed, {
    abortEarly: false,
  });

  if (validationError) {
    const fieldErrors = handleValidationError(validationError);
    return { error: "Validation failed", fieldErrors };
  }

  set(loadingAtom, true);
  try {
    const response = await fetch(`${WALLET_APP_API}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(value),
      credentials: "include",
    });

    const data = await response.json();
    if (response.ok) {
      return data;
    } else {
      return { error: data?.message || "Login failed" };
    }
  } catch (err) {
    return {
      error: err instanceof Error ? err.message : "Unexpected error",
    };
  } finally {
    set(loadingAtom, false);
  }
});
