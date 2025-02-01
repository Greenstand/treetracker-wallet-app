import { useAtom } from "jotai";
import { authAtom } from "../atoms";
import { storage } from "../utils/storage";

export const useLogout = () => {
  const [, setIsAuth] = useAtom(authAtom);

  const logout = async () => {
    setIsAuth(false); // ✅ Reset Jotai auth state
    await storage.removeItem("isAuth"); // ✅ Remove auth state from storage (Web & Mobile)
  };

  return { logout };
};
