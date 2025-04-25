import { fetchData } from "..";

export async function UsersLogin(username: string, password: string) {
  try {
    const res = await fetchData({
      endpoint: `/users/login`,
      method: "POST",
      params: {
        username: username,
        password: password,
      },
    });
    return res;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function UsersCreate(email: string, username: string, password: string) {
  try {
    const res = await fetchData({
      endpoint: `/users/register`,
      method: "POST",
      params: {
        email: email,
        role: "ADMIN",
        username: username,
        password: password,
      },
    });
    return res;
  } catch (error) {
    console.error(error);
    throw error;
  }
}