import { useAtom } from "jotai";
import { registerSchema, loginSchema } from "../schemas/authSchemas";
import { AuthData, FormType } from "../types/auth";
import { WALLET_APP_API } from "../utils/config";
import { storage } from "../utils/storage";
import { handleValidationError, trimInputs } from "../utils/validation";
import { registerStateAtom, loginStateAtom, userAuthAtom } from "../atoms";

export const useSession = (formType: FormType) => {
  const [formState, setFormState] = useAtom(
    formType === "register" ? registerStateAtom : loginStateAtom,
  );
  const [isAuth, setIsAuth] = useAtom(userAuthAtom);

  const setUserState = (partialState: Partial<AuthData>) => {
    setFormState(prev => ({ ...prev, ...partialState }));
  };

  const prepareAuthPayload = (formType: FormType, userState: AuthData) => {
    const { isSubmitting, submissionSuccess, error, fieldErrors, ...userData } =
      userState;

    const trimmedInput = trimInputs(userData);

    const schema = formType === "register" ? registerSchema : loginSchema;
    const { error: validationError, value } = schema.validate(trimmedInput, {
      abortEarly: false,
    });

    if (validationError) {
      const fieldErrors = handleValidationError(validationError);
      return { valid: false, fieldErrors };
    }

    const payload = {
      username: value.username,
      password: value.password,
      ...(formType === "register"
        ? {
            firstName: value.firstName,
            lastName: value.lastName,
            email: value.email,
          }
        : {}),
    };

    return { valid: true, payload };
  };

  const handleFormSubmit = async (): Promise<void> => {
    setUserState({ isSubmitting: true, error: null, fieldErrors: {} });

    const { valid, payload, fieldErrors } = prepareAuthPayload(
      formType,
      formState,
    );

    if (!valid) {
      setUserState({ isSubmitting: false, fieldErrors });
      return;
    }

    try {
      const response = await fetch(`${WALLET_APP_API}/${formType}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        credentials: "include",
      });
      const responseData = await response.json();
      console.log(responseData);
      if (response.ok && responseData.success) {
        if (formType === "login") {
          setIsAuth(true);
          await storage.setItem("isAuth", "true");
        }

        setUserState({
          ...formState,
          isSubmitting: false,
          submissionSuccess: true,
          error: null,
          fieldErrors: {},
        });
      } else {
        setUserState({
          ...formState,
          isSubmitting: false,
          submissionSuccess: false,
          error: responseData.message || "Submission failed",
          fieldErrors: {},
        });
      }
    } catch (error) {
      const errorMsg =
        error instanceof Error ? error.message : "An error occurred";
      setUserState({
        ...formState,
        isSubmitting: false,
        submissionSuccess: false,
        error: errorMsg,
        fieldErrors: {},
      });
    }
  };

  const logout = async () => {
    setIsAuth(false);
    await storage.removeItem("isAuth");
  };

  return { formState, setUserState, handleFormSubmit, isAuth, logout };
};
