import { getDecryptedCookie } from "@/utils/string-cipher";
import { fetchDataProps } from "@/types/common";

const BASE_URL: any = process.env.NEXT_PUBLIC_API_URL;

export async function fetchData({
  endpoint,
  cache = "force-cache",
  headers,
  mode = "cors",
  params,
  responseType = "json",
  method = "POST",
}: fetchDataProps) {
  try {
    const defaultHeaders: any = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      Accept: "application/json",
      ...headers,
    };

    // get the decrypted token
    // const authToken = getDecryptedCookie("auth_token");
    const authToken = null;
    if (authToken) {
      defaultHeaders["Auth-Token"] = authToken as string;
    }

    const options: RequestInit = {
      method: method,
      mode: mode,
      headers: defaultHeaders,
    };

    if (method !== "GET") {
      options.body = JSON.stringify(params);
    }
    console.log(`${BASE_URL}${endpoint}`)

    const response = await fetch(`${BASE_URL}${endpoint}`, options);

    if (responseType === "json") {
      const data = await response.json();
      return data;
    } else if (responseType === "blob") {
      const data = await response.blob();
      return data;
    } else {
      throw new Error(`Unsupported responseType: ${responseType}`);
    }
  } catch (error) {
    console.error(error);
    return error;
  }
}
