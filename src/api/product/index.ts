import { CallApi } from "..";

export async function fetchProductList(page: number, limit: number) {
  try {
    const res = await CallApi({
      endpoint: `/ecommerce/products?page${page}&limit${limit}`,
      method: "GET",
      params: {},
    });
    return res;
  } catch (error) {
    console.error(error);
    throw error;
  }
}