import { useUserStore } from "../../stores/useUserStore";

export function useUser() {
  const user = useUserStore((state) => state.user);
  const userdata = useUserStore((state) => state.userdata);
  const login = useUserStore((state) => state.login);
  const get_user_logged = useUserStore((state) => state.get_user_logged);
  const logout = useUserStore((state) => state.logout);
  const edit_userdata = useUserStore((state) => state.edit_userdata);

  return { user, userdata, login, get_user_logged, logout, edit_userdata };
}
