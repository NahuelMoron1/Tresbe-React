import { create } from "zustand";
import type { UserState } from "../shared/models/User";
import {
  editUserdata,
  getUserdata,
  getUserLogged,
  login,
  logout,
} from "../shared/services/User";

export const useUserStore = create<UserState>()((set, get) => {
  return {
    user: null,
    userdata: null,

    login: async (email: string, password: string) => {
      const loggedUser = await login(email, password);
      if (!loggedUser) {
        return { logged: false, message: "Credenciales Incorrectas" };
      }

      const loggedData = await getUserdata(loggedUser.id);
      if (!loggedData) {
        set({ user: null, userdata: null });
        return {
          logged: false,
          message: "No se encontró la información del usuario",
        };
      }

      set({ user: loggedUser, userdata: loggedData });
      return { logged: true, message: "Login correcto" };
    },

    get_user_logged: async () => {
      const loggedUser = await getUserLogged();
      if (!loggedUser) {
        set({ user: null, userdata: null });
        return;
      }
      set({ user: loggedUser });

      const loggedData = await getUserdata(loggedUser.id);
      if (!loggedData) {
        set({ userdata: null });
        return;
      }

      set({ userdata: loggedData });
      return;
    },

    logout: async () => {
      const res = await logout();
      if (res) {
        set({ user: null });
      }
    },

    edit_userdata: async (newUserdata) => {
      const { userdata } = get();
      if (!newUserdata || !userdata) {
        return {
          modified: false,
          message: "No hay información para actualizar",
        };
      }

      const saved = await editUserdata(userdata.id, newUserdata);
      if (saved) {
        set({
          userdata: {
            ...userdata, // Primero esparcimos los datos viejos (ID, email, etc.)
            ...newUserdata, // Luego esparcimos los nuevos (sobrescriben a los viejos)
          },
        });
        return { modified: true, message: "Información actualizada" };
      }
      return {
        modified: false,
        message: "Hubo un error al actualizar información",
      };
    },
  };
});
