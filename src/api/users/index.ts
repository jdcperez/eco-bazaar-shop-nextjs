import { fetchData } from "..";

export async function UsersLogin(email: string, password: string) {
  try {
    const res = await fetchData({
      endpoint: `/users/login`,
      method: "POST",
      params: {
        username: email,
        password: password,
      },
    });
    return res;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
