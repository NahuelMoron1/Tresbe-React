import { environment } from "../../environments/environment";
import type { User, Userdata } from "../models/User";

const API_URL = environment.endpoint;
const API_OPTIONS = "api/Users/";

export async function getUserLogged() {
  try {
    const res = await fetch(`${API_URL}api/cookies/get/access_token`, {
      credentials: "include",
    });
    if (!res) {
      return undefined;
    }
    const user: User = await res.json();

    return user;
  } catch (error) {
    console.error(error);
    return undefined;
  }
}

export async function getUserdata(userID: string) {
  try {
    const res = await fetch(`${API_URL}api/userdata/userid/${userID}`, {
      credentials: "include",
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
    return undefined;
  }
}

export async function editUserdata(userdataID: string, userdata: Userdata) {
  try {
    await fetch(`${API_URL}api/userdata/${userdataID}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json", // Indica al servidor que lea JSON
      },
      body: JSON.stringify(userdata),
    });
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function login(email: string, password: string) {
  try {
    const userdata = {
      email,
      password,
    };
    const res = await fetch(`${API_URL}${API_OPTIONS}login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userdata),
      credentials: "include",
    });

    const loginData = await res.json();
    const userLogged = loginData.userValidated;
    return userLogged;
  } catch (error) {
    console.error(error);
    return undefined;
  }
}

export async function logout() {
  try {
    await fetch(`${API_URL}${API_OPTIONS}validate/logout/user/logged`, {
      method: "POST",
      credentials: "include",
    });
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}
