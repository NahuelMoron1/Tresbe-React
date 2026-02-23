import { useUserStore } from "../../stores/useUserStore";

export function useUser() {
  const user = useUserStore((state) => state.user);
  const login = useUserStore((state) => state.login);
  const get_user_logged = useUserStore((state) => state.get_user_logged);
  const logout = useUserStore((state) => state.logout);

  return { user, login, get_user_logged, logout };
}
