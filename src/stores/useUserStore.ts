import { create } from "zustand";
import type { UserState } from "../shared/models/User";
import { getUserLogged, login, logout } from "../shared/services/User";

export const useUserStore = create<UserState>()((set) => {
  return {
    user: null,

    login: async (email: string, password: string) => {
      const loggedUser = await login(email, password);
      if (!loggedUser) {
        return { logged: false, message: "Credenciales Incorrectas" };
      }
      set({ user: loggedUser });
      return { logged: true, message: "Login correcto" };
    },

    get_user_logged: async () => {
      const loggedUser = await getUserLogged();
      if (!loggedUser) {
        set({ user: null });
        return;
      }
      set({ user: loggedUser });
      return;
    },

    logout: async () => {
      const res = await logout();
      if (res) {
        set({ user: null });
      }
    },
  };
});
